import { Agent } from "~/services/agent/agent";
import type {
  SignupHandler,
  SigninHandler,
  GetMeHandler,
} from "~/services/agent/client/types";

export class HashnodeAgent extends Agent {
  get app() {
    return this.api.app;
  }

  // auth

  signupHandler: SignupHandler = (body, opts) => {
    return this.api.app.auth.signup(body, opts);
  };

  signinHandler: SigninHandler = (body, opts) => {
    return this.api.app.auth.signin(body, opts);
  };

  // users

  getMeHandler: GetMeHandler = (opts) => {
    return this.api.app.users.getMe(opts);
  };
}
