'use client';

import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { AssessmentStart } from "@/components/assessment/assessment-start";
import { QuestionCard } from "@/components/assessment/question-card";
import { ProgressBar } from "@/components/assessment/progress-bar";
import { AssessmentNavigation } from "@/components/assessment/assessment-navigation";
import { AssessmentResults } from "@/components/assessment/assessment-results";
import { questions } from "@/lib/assessment/questions";
import { calculateResults } from "@/lib/assessment/scoring";
import { Character, AssessmentResult } from "@/types/assessment";
import { createSupabaseClient } from '@/lib/auth/supabase-client';
import { useAuthContext } from '@/components/providers/auth-provider';

export default function AssessmentPage() {
  const [enneagramType, setEnneagramType] = useState<string>();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Character[]>(Array(questions.length).fill(null));
  const [result, setResult] = useState<AssessmentResult>();
  const { toast } = useToast();
  const { user } = useAuthContext();
  const supabase = createSupabaseClient();

  const handleStart = () => {
    if (!enneagramType) {
      toast({
        title: "Please select your Enneagram type",
        variant: "destructive"
      });
      return;
    }
    setStarted(true);
  };

  const handleAnswer = (character: Character) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = character;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (!answers[currentQuestion]) {
      toast({
        title: "Please select an answer",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestion === questions.length - 1) {
      const assessmentResult = calculateResults(parseInt(enneagramType!), answers);
      setResult(assessmentResult);

      if (user) {
        try {
          await supabase.from('assessment_results').insert({
            user_id: user.id,
            enneagram_type: parseInt(enneagramType!),
            communication_style: assessmentResult.communicationStyle,
            emotional_style: assessmentResult.emotionalStyle,
            goal_orientation: assessmentResult.goalOrientation,
            adaptability_style: assessmentResult.adaptabilityStyle,
            rubric: assessmentResult.rubric
          });
        } catch (error) {
          console.error('Error saving assessment results:', error);
          toast({
            title: "Error saving results",
            description: "Your results were generated but couldn't be saved",
            variant: "destructive"
          });
        }
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleCopyRubric = () => {
    if (result) {
      navigator.clipboard.writeText(result.rubric);
      toast({
        title: "Rubric copied to clipboard"
      });
    }
  };

  const handleDecodeRubric = () => {
    window.open('https://chatgpt.com/g/g-Yjz9FIkx2-personasync-adaptive-ai-interaction', '_blank');
  };

  if (result) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <AssessmentResults
          result={result}
          onCopyRubric={handleCopyRubric}
          onDecodeRubric={handleDecodeRubric}
        />
      </div>
    );
  }

  if (!started) {
    return (
      <div className="container mx-auto px-4 py-8">
        <AssessmentStart
          enneagramType={enneagramType}
          onEnneagramChange={setEnneagramType}
          onStart={handleStart}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <ProgressBar current={currentQuestion + 1} total={questions.length} />
      <QuestionCard
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
        currentAnswer={answers[currentQuestion]}
      />
      <AssessmentNavigation
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        hasAnswer={!!answers[currentQuestion]}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}