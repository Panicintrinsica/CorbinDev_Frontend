import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsiveImageComponent } from './responsive-image.component';
import { environment } from '../../../../../environments/environment';

describe('ResponsiveImageComponent', () => {
  let fixture: ComponentFixture<ResponsiveImageComponent>;
  let host: HTMLElement;

  const render = (inputs: Record<string, unknown>) => {
    for (const [name, value] of Object.entries(inputs)) {
      fixture.componentRef.setInput(name, value);
    }
    fixture.detectChanges();
  };

  const variants = [
    { format: 'webp', width: 800, url: 'https://cdn.example/a-800.webp' },
    { format: 'avif', width: 480, url: 'https://cdn.example/a-480.avif' },
    { format: 'webp', width: 480, url: 'https://cdn.example/a-480.webp' },
    { format: 'avif', width: 800, url: 'https://cdn.example/a-800.avif' },
  ] as const;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ResponsiveImageComponent] }).compileComponents();
    fixture = TestBed.createComponent(ResponsiveImageComponent);
    host = fixture.nativeElement as HTMLElement;
  });

  it('offers AVIF as a source and WebP on the img, each ascending by width', () => {
    render({ src: 'https://cdn.example/a-800.webp', variants: [...variants] });

    const source = host.querySelector('source')!;
    expect(source.getAttribute('type')).toBe('image/avif');
    expect(source.getAttribute('srcset')).toBe(
      'https://cdn.example/a-480.avif 480w, https://cdn.example/a-800.avif 800w',
    );

    const img = host.querySelector('img')!;
    expect(img.getAttribute('srcset')).toBe(
      'https://cdn.example/a-480.webp 480w, https://cdn.example/a-800.webp 800w',
    );
    expect(img.getAttribute('src')).toBe('https://cdn.example/a-800.webp');
  });

  it('tells the browser how wide the image renders', () => {
    render({ src: 'x', variants: [...variants], sizes: '100vw' });

    expect(host.querySelector('source')!.getAttribute('sizes')).toBe('100vw');
    expect(host.querySelector('img')!.getAttribute('sizes')).toBe('100vw');
  });

  it('reserves layout space and defers loading', () => {
    render({ src: 'https://cdn.example/a.webp', width: 1200, height: 600, alt: 'A cat' });

    const img = host.querySelector('img')!;
    expect(img.getAttribute('width')).toBe('1200');
    expect(img.getAttribute('height')).toBe('600');
    expect(img.getAttribute('loading')).toBe('lazy');
    expect(img.getAttribute('decoding')).toBe('async');
    expect(img.getAttribute('alt')).toBe('A cat');
  });

  it('renders a plain img when the image predates variants', () => {
    render({ src: '/media/2026/08/a.webp' });

    expect(host.querySelector('source')).toBeNull();
    const img = host.querySelector('img')!;
    expect(img.hasAttribute('srcset')).toBeFalse();
    expect(img.hasAttribute('sizes')).toBeFalse();
    expect(img.getAttribute('src')).toBe(`${environment.API}/media/2026/08/a.webp`);
  });

  it('omits the AVIF source for an animated image that only has WebP', () => {
    render({ src: 'x', variants: variants.filter((variant) => variant.format === 'webp') });

    expect(host.querySelector('source')).toBeNull();
    expect(host.querySelector('img')!.getAttribute('srcset')).toContain('480w');
  });

  it('resolves site-relative variant URLs against the API origin', () => {
    render({ src: 'x', variants: [{ format: 'webp', width: 480, url: '/media/2026/08/a-480.webp' }] });

    expect(host.querySelector('img')!.getAttribute('srcset')).toBe(
      `${environment.API}/media/2026/08/a-480.webp 480w`,
    );
  });
});
