import { getDomainUrl } from "~/utils/util";

// types
import type { HashnodeApiConstructorOptions } from "~/services/types";
import type { Theme } from "~/context/useThemeContext";
import type { Toast } from "~/services/validate/toast.validate";
import type { HoneypotInputProps } from "remix-utils/honeypot/server";

type Root = {
  currentProfile: SerializeSchema.SerializeUser | null;
  csrfToken: string;
  env: Record<string, string>;
  theme: Theme | null;
  toast: Toast | null;
  origin: string;
  honeyProps: HoneypotInputProps;
};

export class AppApiService {
  constructor(private readonly opts: HashnodeApiConstructorOptions) {}

  private get $server() {
    return this.opts.services.server;
  }

  private get $theme() {
    return this.opts.services.theme;
  }

  private get $csrf() {
    return this.opts.services.csrf;
  }

  private get $honeypot() {
    return this.opts.services.honeypot;
  }

  private get $toast() {
    return this.opts.services.toast;
  }

  private get $env() {
    return this.opts.env;
  }

  private get $agent() {
    return this.opts.services.agent;
  }

  /**
   * @version 2023-08-17
   * @description 회원가입 후 리다이렉트
   * @param {Request} request
   */
  async root(request: Request, getSession: Promise<Root["currentProfile"]>) {
    const { toast, headers: toastHeaders } =
      await this.$toast.getToast(request);

    const values = await this.$csrf.csrf.commitToken(request);
    const [csrfToken, csrfHeader] = values;

    const honeyProps = this.$honeypot.honeypot.getInputProps();

    const $object = {
      currentProfile: null,
      theme: null,
      csrfToken,
      toast,
      origin: getDomainUrl(request),
      env: {
        API_BASE_URL: this.$env.API_BASE_URL,
      },
      honeyProps,
    } as Root;

    try {
      const [session, theme] = await Promise.all([
        getSession,
        this.$theme.getTheme(request),
      ]);

      const $data = Object.assign({}, $object, {
        currentProfile: session,
        theme,
      });

      const headers = this.$server.getClearAuthHeaders();

      return {
        data: $data,
        headers: this.$server.combineHeaders(
          csrfHeader ? { "set-cookie": csrfHeader } : null,
          toastHeaders,
          session ? null : headers
        ),
      };
    } catch (error) {
      console.error(error);
      return {
        data: $object,
        headers: this.$server.combineHeaders(
          csrfHeader ? { "set-cookie": csrfHeader } : null,
          toastHeaders
        ),
      };
    }
  }
}
