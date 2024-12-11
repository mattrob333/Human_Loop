'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnneagramSelect } from "./enneagram-select";

interface AssessmentStartProps {
  enneagramType?: string;
  setEnneagramType: (value: string) => void;
  onStart: () => void;
}

export function AssessmentStart({ 
  enneagramType, 
  setEnneagramType, 
  onStart 
}: AssessmentStartProps) {
  return (
    <Card className="max-w-4xl mx-auto w-full scale-125 mt-32">
      <CardHeader className="py-8">
        <CardTitle className="flex flex-col items-start gap-6">
          <div>
            <span className="text-5xl">
              <span className="text-[#00FF00]">{'{human}'}</span>
              <span className="text-white">loop</span>
            </span>
            <span className="text-lg text-gray-400 ml-3">Assessment</span>
          </div>
          <span className="text-lg text-white italic tracking-wide">The first AI translator for human personalities.</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pb-8">
        <div className="flex justify-end">
          <a
            href="https://openpsychometrics.org/tests/OEPS/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-blue-400 hover:text-blue-300 hover:underline"
          >
            Take the Enneagram
          </a>
        </div>
        <div className="space-y-4">
          <label className="text-base font-medium">Select Your Enneagram Type:</label>
          <EnneagramSelect value={enneagramType} onValueChange={setEnneagramType} />
        </div>
        <Button className="w-full text-lg py-6" onClick={onStart}>
          Begin Assessment
        </Button>
      </CardContent>
    </Card>
  );
}