import type { FieldErrors } from 'react-hook-form';
import {
  Link,
  useActionData,
  useNavigation,
  useSubmit,
} from '@remix-run/react';
import { useForm } from 'react-hook-form';

import { type RoutesActionData } from '~/.server/routes/auth/signin.action';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { InputPassword } from '~/components/ui/input-password';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { createFormData } from '~/services/libs/form-data';
import {
  FormFieldValues,
  resolver,
} from '~/services/validate/signup-api.validate';

interface SignupFormProps {
  email?: string;
}

export default function SignupForm({ email }: SignupFormProps) {
  const navigation = useNavigation();
  const submit = useSubmit();
  const actionData = useActionData<RoutesActionData>();

  const isSubmittingForm = navigation.state !== 'idle';

  const form = useForm<FormFieldValues>({
    resolver,
    defaultValues: {
      username: '',
      email: email || '',
      password: '',
      nickname: '',
      confirmPassword: '',
    },
    reValidateMode: 'onBlur',
    errors: actionData?.errors as FieldErrors<FormFieldValues> | undefined,
  });

  const onSubmit = (input: FormFieldValues) => {
    const formData = createFormData(input);
    submit(formData, {
      method: 'post',
      replace: true,
    });
  };

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="username"
                      aria-label="Username"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      aria-label="Email address"
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <InputPassword
                      aria-label="Password"
                      autoComplete="current-password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Confirm Password</FormLabel>
                  </div>
                  <FormControl>
                    <InputPassword
                      aria-label="Confirm Password"
                      autoComplete="current-password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-2 space-x-2"
              disabled={isSubmittingForm}
            >
              {isSubmittingForm ? (
                <Icons.spinner className="animate-spin" />
              ) : null}
              <span>Sign up</span>
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="w-full space-x-2"
                type="button"
                disabled={isSubmittingForm}
              >
                <Icons.gitHub className="size-4" />
                <span>GitHub</span>
              </Button>
              <Button
                variant="outline"
                className="w-full space-x-2"
                type="button"
                disabled={isSubmittingForm}
              >
                <Icons.facebook className="size-4" />
                <span>Facebook</span>
              </Button>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                {`Already have an account?`}{' '}
                <Link
                  to={PAGE_ENDPOINTS.AUTH.SIGNIN}
                  className="text-primary"
                  aria-disabled={isSubmittingForm}
                  unstable_viewTransition
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
