'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  const router = useRouter();

  const handleBypass = () => {
    // Store admin bypass in localStorage
    localStorage.setItem('adminBypass', 'true');
    router.push('/assessment');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Admin Access</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleBypass}
            className="w-full"
          >
            Access Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}