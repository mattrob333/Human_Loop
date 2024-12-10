'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Card, CardContent } from '@/components/ui/card';
import { createSupabaseClient } from '@/lib/auth/supabase-client';

export default function SignIn() {
  const supabase = createSupabaseClient();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="mb-6 flex justify-center">
            <img src="/humanloop-logo.svg" alt="Human Loop" className="h-8" />
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#00FF00',
                    brandAccent: '#00CC00',
                    inputBackground: 'transparent',
                    inputText: 'inherit',
                    inputBorder: 'rgb(226 232 240)',
                  },
                },
              },
              className: {
                button: 'bg-green-600 hover:bg-green-700 text-white',
                input: 'rounded-lg border bg-transparent px-3 py-2 text-sm',
                label: 'text-sm font-medium',
              },
            }}
            localization={{
              variables: {
                sign_up: {
                  email_label: 'Email address',
                  password_label: 'Create a Password',
                  button_label: 'Sign Up',
                },
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Your Password',
                  button_label: 'Sign In',
                },
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/auth/callback`}
            onlyThirdPartyProviders={false}
            magicLink={true}
            view="magic_link"
          />
        </CardContent>
      </Card>
    </div>
  );
}