import type { Nullable } from "./api";

export interface TechStackSchema {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
  deletedAt?: Nullable<number>;
}

export interface UserProfileSchema {
  id: number;
  userId: number;
  name: string;
  bio?: Nullable<string>;
  avatarUrl?: Nullable<string>;
  availableText?: Nullable<string>;
  location?: Nullable<string>;
  website?: Nullable<string>;
  createdAt: number;
  updatedAt: number;
  deletedAt?: Nullable<number>;
}

export interface ProfileOnTechStacks {
  id: number;
  profileId: number;
  techStackId: number;
  profile: UserProfileSchema;
  techStack: TechStackSchema;
}

export interface UserSchema {
  id: number;
  email: string;
  username: string;
  profile: UserProfileSchema;
  profileOnTechStacks: ProfileOnTechStacks[];
  createdAt: number;
  updatedAt: number;
  deletedAt?: Nullable<number>;
}
