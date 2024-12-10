'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createSupabaseClient } from '@/lib/auth/supabase-client';
import { AUTH_PROVIDERS, AUTH_APPEARANCE } from '@/lib/auth/constants';

export function AuthForm() {
  const supabase = createSupabaseClient();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          Welcome to <span className="text-[#00FF00]">{'{human}'}</span>
          <span className="text-white">loop</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Auth
          supabaseClient={supabase}
          view="sign_in"
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: AUTH_APPEARANCE.theme.colors,
              },
            },
            className: AUTH_APPEARANCE.className,
          }}
          providers={AUTH_PROVIDERS}
          redirectTo={`${baseUrl}/auth/callback`}
          magicLink={true}
          showLinks={true}
        />
      </CardContent>
    </Card>
  );
}