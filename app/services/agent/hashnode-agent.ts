import { Agent } from "~/services/agent/agent";
import type {
  SignupHandler,
  SigninHandler,
} from "~/services/agent/client/types";

export class HashnodeAgent extends Agent {
  get app() {
    return this.api.app;
  }

  signupHandler: SignupHandler = (body, opts) => {
    return this.api.app.auth.signup(body, opts);
  };

  signinHandler: SigninHandler = (body, opts) => {
    return this.api.app.auth.signin(body, opts);
  };
}
