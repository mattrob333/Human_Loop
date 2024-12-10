'use client';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question, Character } from "@/types/assessment";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: Character | null;
  onAnswer: (character: Character) => void;
}

export function QuestionCard({ 
  question, 
  selectedAnswer, 
  onAnswer 
}: QuestionCardProps) {
  const selectedId = selectedAnswer 
    ? question.options.find(opt => opt.character.name === selectedAnswer.name)?.id 
    : undefined;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Question {question.id} of 10
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">{question.text}</p>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedId}
          onValueChange={(value) => {
            const option = question.options.find(opt => opt.id === value);
            if (option) {
              onAnswer(option.character);
            }
          }}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div key={option.id} className="flex items-start space-x-3">
              <RadioGroupItem value={option.id} id={`q${question.id}-${option.id}`} />
              <Label
                htmlFor={`q${question.id}-${option.id}`}
                className="grid gap-1.5 leading-none cursor-pointer"
              >
                <span className="font-medium text-foreground">{option.character.name}</span>
                <span className="text-sm text-muted-foreground">
                  {option.character.description}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}