'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Support</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            For support inquiries, please contact us at support@teamsync.ai
          </p>
        </CardContent>
      </Card>
    </div>
  );
}