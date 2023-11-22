import { useMatchesData } from "~/libs/hooks/useMatchesData";

function isSession(user: any): user is FetchRespSchema.UserResponse {
  return user && typeof user === "object" && typeof user.id === "string";
}

export function useOptionalSession(): FetchRespSchema.UserResponse | undefined {
  const data = useMatchesData("root") as any;
  if (!data || !isSession(data.currentProfile)) {
    return undefined;
  }
  return data.currentProfile;
}

export function useSession(): FetchRespSchema.UserResponse {
  const maybeUser = useOptionalSession();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalSession instead."
    );
  }
  return maybeUser;
}
