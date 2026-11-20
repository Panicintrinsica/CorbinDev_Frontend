import { Component, computed, ElementRef, inject, OnDestroy, signal, viewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

export interface AvatarCropperData {
  file: File;
  /** The narrowest the cropped square may be, in source pixels. */
  minSide: number;
}

/** The longest side the cropped picture is sent at; the server makes its own sizes. */
const MAX_OUTPUT = 1024;
const VIEW = 320;

/**
 * Pick the square of a photo that becomes the profile picture: drag to move, slide to
 * zoom. The crop happens here, so only the chosen square is ever uploaded. Zoom stops
 * where the square would drop under `minSide` source pixels (no upscaling). Closes with
 * the cropped `File`, or nothing when cancelled.
 */
@Component({
  selector: 'app-avatar-cropper',
  standalone: true,
  imports: [MatDialogModule, MatButton],
  template: `
    <h2 mat-dialog-title>Crop your picture</h2>
    <mat-dialog-content>
      @if (failed()) {
        <p class="problem" role="alert">{{ failed() }}</p>
      } @else {
        <div
          class="view"
          #view
          [style.width.px]="size"
          [style.height.px]="size"
          (pointerdown)="down($event)"
          (pointermove)="move($event)"
          (pointerup)="up($event)"
          (pointercancel)="up($event)"
        >
          @if (src()) {
            <img
              [src]="src()"
              alt=""
              draggable="false"
              [style.width.px]="naturalW() * scale()"
              [style.height.px]="naturalH() * scale()"
              [style.transform]="'translate(' + x() + 'px,' + y() + 'px)'"
            />
          }
          <span class="ring"></span>
        </div>
        <label class="zoom">
          Zoom
          <input
            type="range"
            [min]="minScale()"
            [max]="maxScale()"
            step="0.001"
            [value]="scale()"
            [disabled]="maxScale() <= minScale()"
            (input)="zoom($any($event.target).valueAsNumber)"
          />
        </label>
        <p class="note">Drag the photo to position it. The circle shows how it will look as an avatar.</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button type="button" (click)="ref.close()">Cancel</button>
      <button mat-flat-button type="button" [disabled]="!ready() || busy()" (click)="confirm()">
        {{ busy() ? 'Working…' : 'Use picture' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    .view {
      position: relative;
      overflow: hidden;
      margin: 0 auto;
      background: #000;
      cursor: grab;
      touch-action: none;
      user-select: none;
    }
    .view:active { cursor: grabbing; }
    img { position: absolute; left: 0; top: 0; max-width: none; pointer-events: none; }
    .ring {
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: 50%;
      box-shadow: 0 0 0 999px rgba(0, 0, 0, 0.55);
      outline: 2px solid rgba(255, 255, 255, 0.8);
      outline-offset: -2px;
    }
    .zoom { display: grid; gap: 0.25rem; margin: 1rem auto 0; width: 320px; font-size: 0.8rem; }
    .note { text-align: center; font-size: 0.8rem; opacity: 0.7; }
    .problem { color: hsl(10, 90%, 80%); }
  `,
})
export class AvatarCropperComponent implements OnDestroy {
  protected ref = inject<MatDialogRef<AvatarCropperComponent, File>>(MatDialogRef);
  private data = inject<AvatarCropperData>(MAT_DIALOG_DATA);
  private view = viewChild<ElementRef<HTMLElement>>('view');

  protected size = VIEW;
  protected src = signal<string | null>(null);
  protected failed = signal<string | null>(null);
  protected busy = signal(false);
  protected naturalW = signal(0);
  protected naturalH = signal(0);
  protected scale = signal(1);
  protected x = signal(0);
  protected y = signal(0);

  /** Smallest zoom: the photo just covers the square. */
  protected minScale = computed(() => {
    const side = Math.min(this.naturalW(), this.naturalH());
    return side ? VIEW / side : 1;
  });
  /** Largest zoom: the visible square is still `minSide` source pixels. */
  protected maxScale = computed(() => Math.max(this.minScale(), VIEW / this.data.minSide));
  protected ready = computed(() => this.naturalW() > 0 && !this.failed());

  private image = new Image();
  private drag: { id: number; px: number; py: number } | null = null;

  constructor() {
    const url = URL.createObjectURL(this.data.file);
    this.image.onload = () => {
      const w = this.image.naturalWidth;
      const h = this.image.naturalHeight;
      if (Math.min(w, h) < this.data.minSide) {
        this.failed.set(
          `That photo is ${w}×${h}px; its shorter side needs to be at least ${this.data.minSide}px.`,
        );
        return;
      }
      this.naturalW.set(w);
      this.naturalH.set(h);
      this.scale.set(this.minScale());
      this.place((VIEW - w * this.scale()) / 2, (VIEW - h * this.scale()) / 2);
      this.src.set(url);
    };
    this.image.onerror = () => this.failed.set('That file could not be read as an image.');
    this.image.src = url;
    this.url = url;
  }

  private url: string;

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.url);
  }

  /** Moves the photo, never letting the square show empty space. */
  private place(x: number, y: number): void {
    const w = this.naturalW() * this.scale();
    const h = this.naturalH() * this.scale();
    this.x.set(Math.min(0, Math.max(VIEW - w, x)));
    this.y.set(Math.min(0, Math.max(VIEW - h, y)));
  }

  protected down(event: PointerEvent): void {
    this.drag = { id: event.pointerId, px: event.clientX, py: event.clientY };
    this.view()?.nativeElement.setPointerCapture(event.pointerId);
  }

  protected move(event: PointerEvent): void {
    if (!this.drag || this.drag.id !== event.pointerId) return;
    this.place(this.x() + event.clientX - this.drag.px, this.y() + event.clientY - this.drag.py);
    this.drag.px = event.clientX;
    this.drag.py = event.clientY;
  }

  protected up(event: PointerEvent): void {
    if (this.drag?.id === event.pointerId) this.drag = null;
  }

  /** Zooms about the centre of the square. */
  protected zoom(next: number): void {
    const before = this.scale();
    const scale = Math.min(this.maxScale(), Math.max(this.minScale(), next));
    const cx = (VIEW / 2 - this.x()) / before;
    const cy = (VIEW / 2 - this.y()) / before;
    this.scale.set(scale);
    this.place(VIEW / 2 - cx * scale, VIEW / 2 - cy * scale);
  }

  protected async confirm(): Promise<void> {
    this.busy.set(true);
    const scale = this.scale();
    const side = VIEW / scale; // the square, in source pixels
    const out = Math.round(Math.min(side, MAX_OUTPUT));
    const canvas = document.createElement('canvas');
    canvas.width = out;
    canvas.height = out;
    const context = canvas.getContext('2d');
    if (!context) {
      this.failed.set('Your browser could not crop the picture.');
      return;
    }
    context.imageSmoothingQuality = 'high';
    context.drawImage(this.image, -this.x() / scale, -this.y() / scale, side, side, 0, 0, out, out);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) {
      this.failed.set('Your browser could not crop the picture.');
      return;
    }
    const name = this.data.file.name.replace(/\.[^.]+$/, '') || 'picture';
    this.ref.close(new File([blob], `${name}.png`, { type: 'image/png' }));
  }
}
