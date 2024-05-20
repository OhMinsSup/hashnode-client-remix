import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

import { UserProfileFormProvider } from '~/components/settings/context/useUserProfileFormContext';
import { SettingForm } from '~/components/settings/future/SettingForm';
import { useMatchesData } from '~/libs/hooks/useMatchesData';

export { meta } from '~/services/seo/settings/settings.meta';
export { action } from '~/.server/routes/settings/settings.action';

export default function Routes() {
  const initialValues = useMatchesData(
    'routes/_settings',
  ) as RemixDataFlow.Response<SerializeSchema.SerializeUser>;

  return (
    <UserProfileFormProvider initialValues={initialValues?.result}>
      <SettingForm />
    </UserProfileFormProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  } else {
    return <Routes />;
  }
}
