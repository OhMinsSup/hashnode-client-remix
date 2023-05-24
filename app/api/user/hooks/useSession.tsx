import type { UserRespSchema } from "~/api/schema/resp";
import { useMatchesData } from "~/libs/hooks/useMatchesData";

function isSession(user: any): user is UserRespSchema {
  return user && typeof user === "object" && typeof user.id === "number";
}

export function useOptionalSession(): UserRespSchema | undefined {
  const data = useMatchesData("root");
  if (!data || !isSession(data.currentProfile)) {
    return undefined;
  }
  return data.currentProfile;
}

export function useSession(): UserRespSchema {
  const maybeUser = useOptionalSession();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalSession instead."
    );
  }
  return maybeUser;
}
