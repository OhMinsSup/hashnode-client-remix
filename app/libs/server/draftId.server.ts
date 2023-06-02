import { createCookieSessionStorage } from "@remix-run/cloudflare";

const draftIdStorage = createCookieSessionStorage({
  cookie: {
    name: "hashnode.draftId",
    secure: true,
    secrets: ["a secret that you should change"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

async function getDraftIdSession(request: Request) {
  const session = await draftIdStorage.getSession(
    request.headers.get("Cookie")
  );
  return {
    getId: () => {
      return session.get("draftId");
    },
    setId: (id: string | number) => session.set("draftId", id),
    clearId: () => session.unset("draftId"),
    commit: () =>
      draftIdStorage.commitSession(session, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      }),
  };
}

export { getDraftIdSession };
