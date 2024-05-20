import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

import { EmailPreferencesFormProvider } from '~/components/settings/context/useEmailPreferencesFormContext';
import { EmailPreferencesForm } from '~/components/settings/future/EmailPreferencesForm';
import { useMatchesData } from '~/libs/hooks/useMatchesData';

export { meta } from '~/services/seo/settings/settings-email.meta';

export default function Routes() {
  const initialValues = useMatchesData(
    'routes/_settings',
  ) as RemixDataFlow.Response<SerializeSchema.SerializeUser>;

  return (
    <EmailPreferencesFormProvider
      initialValues={initialValues?.result?.UserEmail}
    >
      <EmailPreferencesForm />
    </EmailPreferencesFormProvider>
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
