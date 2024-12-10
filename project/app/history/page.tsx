'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabase } from '@/components/providers/supabase-provider';
import type { Database } from '@/lib/supabase/types';

type AssessmentResult = Database['public']['Tables']['assessment_results']['Row'];

export default function HistoryPage() {
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
  const { user } = useSupabase();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    async function fetchAssessments() {
      if (!user) return;

      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching assessments:', error);
        return;
      }

      setAssessments(data || []);
    }

    fetchAssessments();
  }, [user, supabase]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-8 text-center">
            Please sign in to view your assessment history.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Assessment History</CardTitle>
        </CardHeader>
        <CardContent>
          {assessments.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No assessments found. Take your first assessment to see your results here.
            </p>
          ) : (
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <Card key={assessment.id}>
                  <CardContent className="py-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {new Date(assessment.created_at).toLocaleDateString()}
                      </p>
                      <p className="font-mono text-sm">
                        {assessment.rubric}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}