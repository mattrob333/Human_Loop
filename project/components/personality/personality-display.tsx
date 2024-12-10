'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StoredAssessmentResult } from "@/types/assessment";

interface PersonalityDisplayProps {
  result: StoredAssessmentResult;
  onCopyRubric?: () => void;
}

export function PersonalityDisplay({ result, onCopyRubric }: PersonalityDisplayProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Personality Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm font-mono whitespace-nowrap overflow-x-auto text-center">
            {result.rubric}
          </p>
        </div>
        <div className="grid gap-4">
          <div>
            <h4 className="font-medium mb-1">Communication Style</h4>
            <p className="text-sm text-muted-foreground">{result.communication_style}</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Emotional Style</h4>
            <p className="text-sm text-muted-foreground">{result.emotional_style}</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Goal Orientation</h4>
            <p className="text-sm text-muted-foreground">{result.goal_orientation}</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Adaptability Style</h4>
            <p className="text-sm text-muted-foreground">{result.adaptability_style}</p>
          </div>
        </div>
        {onCopyRubric && (
          <Button variant="outline" className="w-full" onClick={onCopyRubric}>
            Copy Rubric
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
