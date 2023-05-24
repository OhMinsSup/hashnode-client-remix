import { signinSchema } from "~/api/auth/validation/signin";
import { signinApi } from "~/api/auth/signin.server";

// types
import type { Env } from "../env";
import { signupSchema } from "~/api/auth/validation/signup";
import { signupApi } from "~/api/auth/signup.server";

export class AuthApiService {
  constructor(private readonly env: Env) {}

  /**
   * @description 로그인 API
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof signinApi>>}
   */
  async signin(request: Request): Promise<ReturnType<typeof signinApi>> {
    const formData = await this.readFormData(request);
    const input = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const parse = await signinSchema.parseAsync(input);
    return await signinApi(parse);
  }

  /**
   * @description 회원가입 API
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof signupApi>>}
   */
  async signup(request: Request): Promise<ReturnType<typeof signupApi>> {
    const formData = await this.readFormData(request);
    const input = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
    const parse = await signupSchema.parseAsync(input);
    return await signupApi({
      email: parse.email,
      username: parse.username,
      password: parse.password,
    });
  }

  /**
   * @description 로그인 쿠키 생성
   * @param {string} cookieValue
   * @returns {Headers}
   */
  getAuthHeaders(cookieValue: string): Headers {
    const headers = new Headers();
    headers.append("Set-Cookie", cookieValue);
    return headers;
  }

  getClearAuthHeaders(): Headers {
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      "access_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    return headers;
  }

  /**
   * @description FormData 읽기
   * @param {Request} request
   * @returns {Promise<FormData>}
   */
  private async readFormData(request: Request): Promise<FormData> {
    return await request.formData();
  }
}
