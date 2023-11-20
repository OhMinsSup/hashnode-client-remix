import { Honeypot, SpamError } from "remix-utils/honeypot/server";

import type { Env } from "./env.server";

export class HoneypotService {
  honeypot: Honeypot;

  constructor(env: Env) {
    this.honeypot = new Honeypot({
      encryptionSeed: env.HONEYPOT_SECRET,
    });
  }

  async checkHoneypot(formData: FormData) {
    try {
      this.honeypot.check(formData);
    } catch (error) {
      if (error instanceof SpamError) {
        throw new Response("Form not submitted properly", { status: 400 });
      }
      throw error;
    }
  }
}
