'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from '@/components/providers/auth-provider';
import { createSupabaseClient } from '@/lib/auth/supabase-client';
import Link from 'next/link';
import { ClipboardCheck, Users, MessageSquare } from 'lucide-react';

interface DashboardData {
  assessmentCount: number;
  teamCount: number;
  latestRubric: string | null;
}

export default function DashboardPage() {
  const { user } = useAuthContext();
  const [data, setData] = useState<DashboardData>({
    assessmentCount: 0,
    teamCount: 0,
    latestRubric: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      const supabase = createSupabaseClient();
      
      // Fetch assessment count
      const { count: assessmentCount } = await supabase
        .from('assessment_results')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch team count
      const { count: teamCount } = await supabase
        .from('team_members')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch latest rubric
      const { data: latestAssessment } = await supabase
        .from('assessment_results')
        .select('rubric')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      setData({
        assessmentCount: assessmentCount || 0,
        teamCount: teamCount || 0,
        latestRubric: latestAssessment?.[0]?.rubric || null
      });
    };

    fetchDashboardData();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        {/* Welcome Section */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, {user?.user_metadata?.full_name || 'Team Member'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {data.latestRubric ? 
                'Your {human}loop profile is ready for enhanced communication.' :
                'Take your first assessment to get started with personalized insights.'}
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                Personality Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.latestRubric ? (
                <>
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <p className="text-sm font-mono whitespace-nowrap overflow-x-auto text-center">
                      {data.latestRubric}
                    </p>
                  </div>
                  <Link href="/assessment">
                    <Button variant="outline" className="w-full">
                      Retake Assessment
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    No assessment results yet
                  </p>
                  <Link href="/assessment">
                    <Button className="w-full">Take Assessment</Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Teams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-2">{data.teamCount}</p>
              <p className="text-sm text-muted-foreground mb-4">
                Active teams
              </p>
              <Button className="w-full" variant="outline">
                Manage Teams
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Communication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Send AI-enhanced messages to your team members
              </p>
              <Button className="w-full" disabled={!data.latestRubric}>
                New Message
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Latest Rubric */}
        {data.latestRubric && (
          <Card>
            <CardHeader>
              <CardTitle>Your <span className="text-[#00FF00]">{'{human}'}</span><span className="text-white">loop</span> Rubric</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="block bg-muted p-4 rounded-lg font-mono text-sm">
                {data.latestRubric}
              </code>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}