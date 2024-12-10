'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createSupabaseClient } from '@/lib/auth/supabase-client';

export default function TestPage() {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to connect to Supabase');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div 
                className={`h-3 w-3 rounded-full ${
                  status === 'testing' ? 'bg-yellow-500' :
                  status === 'success' ? 'bg-green-500' :
                  'bg-red-500'
                }`} 
              />
              <span>
                {status === 'testing' ? 'Testing connection...' :
                 status === 'success' ? 'Connection successful' :
                 'Connection failed'}
              </span>
            </div>
            {error && (
              <p className="text-sm text-red-500">Error: {error}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}