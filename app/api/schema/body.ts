export interface SignupBody {
  username: string;
  email: string;
  name?: string | null;
  password: string;
}

export interface SigninBody {
  type: "normal";
  username?: string;
  email: string;
  password: string;
  mfa_token?: boolean;
}
