'use client';

import { Button } from '@/components/ui/button';
import { useSupabase } from '@/components/providers/supabase-provider';
import { useRouter } from 'next/navigation';

export function AuthButton() {
  const { user, signOut } = useSupabase();
  const router = useRouter();

  if (!user) {
    return (
      <Button onClick={() => router.push('/auth/signin')}>
        Sign In
      </Button>
    );
  }

  return (
    <Button variant="outline" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}