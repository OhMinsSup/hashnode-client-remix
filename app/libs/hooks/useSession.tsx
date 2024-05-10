import { useMatchesData } from '~/libs/hooks/useMatchesData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- `user` can be any object
function isSession(user: any): user is SerializeSchema.SerializeUser {
  return user && typeof user === 'object' && typeof user.id === 'string';
}

export function useOptionalSession():
  | SerializeSchema.SerializeUser
  | undefined {
  const data = useMatchesData('root') as Record<string, unknown>;
  if (!data) {
    return undefined;
  }

  if (!('currentProfile' in data)) {
    return undefined;
  }

  if (!isSession(data.currentProfile)) {
    return undefined;
  }

  return data.currentProfile;
}

export function useSession(): SerializeSchema.SerializeUser {
  const maybeUser = useOptionalSession();
  if (!maybeUser) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalSession instead.',
    );
  }
  return maybeUser;
}
