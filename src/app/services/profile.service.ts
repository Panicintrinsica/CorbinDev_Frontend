import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import type { Avatar, ProfileContent, ProfilePatch } from '../models/profile.model';

export type { Avatar } from '../models/profile.model';

/** The narrowest source the API accepts, on its shorter side. Keep in step with `routes/profile.ts`. */
export const MIN_AVATAR_SIDE = 256;

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private API = environment.API;

  /** What the public Profile page shows; null until a profile has been saved. */
  page() {
    return this.http
      .get<{ profile: ProfileContent | null }>(`${this.API}/profile`)
      .pipe(map((response) => response.profile));
  }

  /** The signed-in user's own profile, for editing. */
  me() {
    return this.http
      .get<{ userId: string; profile: ProfileContent | null }>(`${this.API}/profile/me`)
      .pipe(map((response) => response.profile));
  }

  /** Saves any subset of the profile; fields not in `patch` are left as they are. */
  save(patch: ProfilePatch) {
    return this.http
      .put<{ profile: ProfileContent }>(`${this.API}/profile/me`, patch)
      .pipe(map((response) => response.profile));
  }

  /** Attaches an uploaded picture to the signed-in account, or removes it with null. */
  setAvatar(avatar: Avatar | null) {
    return this.save({ avatar });
  }
}
