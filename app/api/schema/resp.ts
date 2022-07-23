import type { AppAPI } from "./api";

export interface SigninResp extends AppAPI {
  token: string;
}
