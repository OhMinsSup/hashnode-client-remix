export interface SignupBody {
  username: string;
  email: string;
  name?: string | null;
  password: string;
}

export interface SigninBody {
  email: string;
  password: string;
}
