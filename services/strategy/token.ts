import cookies from "cookie";
import { Strategy } from "remix-auth";
import type { SessionStorage } from "@remix-run/cloudflare";
import type { AuthenticateOptions } from "remix-auth";

/**
 * This interface declares what the developer will receive from the strategy
 * to verify the user identity in their system.
 */
export interface TokenStrategyVerifyParams {
  token?: string | null;
  cookie?: string | null;
  request: Request;
}

export class TokenStrategy<User> extends Strategy<
  User,
  TokenStrategyVerifyParams
> {
  name = "token";

  async authenticate(
    request: Request,
    sessionStorage: SessionStorage,
    options: AuthenticateOptions
  ): Promise<User> {
    const cookie =
      request.headers.get("Cookie") ||
      request.headers.get("Set-Cookie") ||
      null;

    let accessToken: string | null = null;
    if (cookie) {
      const { access_token } = cookies.parse(cookie);
      if (access_token) accessToken = access_token;
    }

    let user;
    try {
      user = await this.verify({ token: accessToken, cookie, request });
      return await this.success(user, request, sessionStorage, options);
    } catch (error) {
      return await this.failure(
        (error as Error).message,
        request,
        sessionStorage,
        options
      );
    }
  }
}
