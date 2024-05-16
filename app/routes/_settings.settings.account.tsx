import { json } from '@remix-run/cloudflare';
import {
  unstable_defineClientAction as defineClientAction,
  Form,
  isRouteErrorResponse,
  useFormAction,
  useNavigation,
  useRouteError,
} from '@remix-run/react';

import { RoutesActionData } from '~/.server/routes/settings/settings-account.action';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { useMatchesData } from '~/libs/hooks/useMatchesData';

export { meta } from '~/services/seo/settings/settings-account.meta';
export { action } from '~/.server/routes/settings/settings-account.action';

export const clientAction = defineClientAction(async ({ serverAction }) => {
  const confirmDelete = confirm(
    'Are you sure you want to delete your account?',
  );

  if (!confirmDelete) {
    return json({
      status: 'success' as const,
      result: null,
      message: 'Account deletion cancelled',
      errors: null,
    });
  }

  return await serverAction<RoutesActionData>();
});

export default function Routes() {
  const initialValues = useMatchesData(
    'routes/_settings',
  ) as RemixDataFlow.Response<SerializeSchema.SerializeUser>;

  const action = useFormAction();

  const navigation = useNavigation();

  const isSubmitting =
    navigation.formMethod === 'PUT' && navigation.formAction === action;

  const blogName = initialValues?.result?.Blog?.title;

  return (
    <Form method="delete">
      <div className="space-y-6">
        <div>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Delete account
          </h3>
          <p className="my-4 text-base text-muted-foreground">
            Your Hashnode account administers these blogs:
            <strong>{blogName}</strong>
          </p>
          <p className="mb-4 text-base text-muted-foreground">
            Your personal data will be deleted permanently when you delete your
            account on Hashnode. This action is irreversible.
          </p>
        </div>
        <Separator orientation="horizontal" />
        <Button type="submit" className="mt-8" disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className="mr-2 animate-spin" />
          ) : null}
          <span>Delete your account</span>
        </Button>
      </div>
    </Form>
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
