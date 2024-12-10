'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AssessmentResult } from "@/types/assessment";

interface AssessmentResultsProps {
  result: AssessmentResult;
  onCopyRubric: () => void;
  onDecodeRubric: () => void;
}

export function AssessmentResults({
  result,
  onCopyRubric,
  onDecodeRubric
}: AssessmentResultsProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-card">
      <CardHeader className="text-center">
        <CardTitle>
          Your <span className="text-[#00FF00]">{'{human}'}</span>
          <span className="text-white">loop</span> Assessment Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm font-mono text-center">
            {result.rubric}
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Copy the rubric and go to the decode rubric page and paste it in for your personality playbook
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={onCopyRubric} 
              className="min-w-[140px]"
              variant="default"
            >
              Copy Rubric
            </Button>
            <Button 
              onClick={onDecodeRubric} 
              className="min-w-[140px]"
              variant="secondary"
            >
              Decode Rubric
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}