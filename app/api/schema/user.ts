import type { Nullable } from "./api";

export interface SkillSchema {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: Nullable<string>;
}

export interface UserProfileSchema {
  id: number;
  userId: number;
  name: string;
  tagline?: Nullable<string>;
  avatarUrl?: Nullable<string>;
  location?: Nullable<string>;
  bio?: Nullable<string>;
  availableText?: Nullable<string>;
  createdAt: string;
  updatedAt: string;
  deletedAt?: Nullable<string>;
}

export interface UserSocialSchema {
  github: Nullable<string>;
  twitter: Nullable<string>;
  facebook: Nullable<string>;
  instagram: Nullable<string>;
  website: Nullable<string>;
}

export interface UserSchema {
  id: number;
  email: string;
  username: string;
  profile: Omit<
    UserProfileSchema,
    "id" | "userId" | "createdAt" | "updatedAt" | "deletedAt"
  >;
  skills: Pick<SkillSchema, "id" | "name">[];
  socials: UserSocialSchema;
  createdAt: string;
}
