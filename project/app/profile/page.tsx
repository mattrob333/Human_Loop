'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/components/providers/auth-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, MessageSquare, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { createSupabaseClient } from '@/lib/auth/supabase-client';
import { AvatarUpload } from '@/components/profile/avatar-upload';

interface CommunicationChannel {
  id: string;
  label: string;
  placeholder: string;
}

const communicationChannels: CommunicationChannel[] = [
  { id: 'whatsapp', label: 'WhatsApp', placeholder: '+1234567890' },
  { id: 'telegram', label: 'Telegram', placeholder: '@username' },
  { id: 'slack', label: 'Slack Email', placeholder: 'you@organization.com' },
  { id: 'discord', label: 'Discord', placeholder: 'username#0000' },
];

export default function ProfilePage() {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const supabase = createSupabaseClient();
  
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [channels, setChannels] = useState<Record<string, string>>({});
  const [channelPreferences, setChannelPreferences] = useState<Record<string, boolean>>({});
  const [latestRubric, setLatestRubric] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    if (user) {
      // Initialize fullName from user metadata
      setFullName(user.user_metadata?.full_name || '');
      
      // Load communication preferences from user metadata
      const savedChannels = user.user_metadata?.communication_channels || {};
      const savedPreferences = user.user_metadata?.channel_preferences || {};
      setChannels(savedChannels);
      setChannelPreferences(savedPreferences);
      
      // Fetch latest assessment result and profile data
      const fetchData = async () => {
        try {
          const [assessmentResult, profileData] = await Promise.all([
            supabase
              .from('assessment_results')
              .select('rubric')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .single(),
            supabase
              .from('profiles')
              .select('avatar_url')
              .eq('id', user.id)
              .single()
          ]);

          if (assessmentResult.data) {
            setLatestRubric(assessmentResult.data.rubric);
          }

          if (profileData.data) {
            setAvatarUrl(profileData.data.avatar_url || '');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [user, supabase]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const [authUpdate, profileUpdate] = await Promise.all([
        supabase.auth.updateUser({
          data: {
            full_name: fullName,
            communication_channels: channels,
            channel_preferences: channelPreferences,
          }
        }),
        supabase
          .from('profiles')
          .upsert({
            id: user.id,
            full_name: fullName,
            email: user.email,
            updated_at: new Date().toISOString(),
          })
      ]);

      if (authUpdate.error) throw authUpdate.error;
      if (profileUpdate.error) throw profileUpdate.error;

      toast({
        title: 'Profile updated successfully'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error updating profile',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyRubric = () => {
    if (latestRubric) {
      navigator.clipboard.writeText(latestRubric);
      toast({
        title: "Rubric copied to clipboard"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <AvatarUpload
                  userId={user?.id || ''}
                  currentAvatarUrl={avatarUrl}
                  onAvatarChange={setAvatarUrl}
                />
                <div className="text-center">
                  <h3 className="text-lg font-medium">{fullName || 'Your Name'}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                {latestRubric && (
                  <div className="grid gap-2">
                    <Label>Your <span className="text-[#00FF00]">{'{human}'}</span><span className="text-white">loop</span> Rubric</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={latestRubric}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCopyRubric}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleUpdateProfile} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication">
          <Card>
            <CardHeader>
              <CardTitle>Communication Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {communicationChannels.map((channel) => (
                <div key={channel.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={channel.id} className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      {channel.label}
                    </Label>
                    <Switch
                      id={`${channel.id}-enabled`}
                      checked={channelPreferences[channel.id] || false}
                      onCheckedChange={(checked) => 
                        setChannelPreferences(prev => ({...prev, [channel.id]: checked}))
                      }
                    />
                  </div>
                  <Input
                    id={channel.id}
                    value={channels[channel.id] || ''}
                    onChange={(e) => 
                      setChannels(prev => ({...prev, [channel.id]: e.target.value}))
                    }
                    placeholder={channel.placeholder}
                    disabled={!channelPreferences[channel.id]}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}