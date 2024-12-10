'use client';

import { useState, useEffect } from 'react';
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
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AssessmentPage() {
  const [enneagramType, setEnneagramType] = useState<string>();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Character[]>(Array(questions.length).fill(null));
  const [result, setResult] = useState<AssessmentResult>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuthContext();
  const router = useRouter();
  const supabase = createSupabaseClient();

  useEffect(() => {
    // Check auth state
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to take the assessment",
        variant: "destructive"
      });
      router.push('/auth/signin');
    }
  }, [user, router]);

  const handleStart = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to take the assessment",
        variant: "destructive"
      });
      router.push('/auth/signin');
      return;
    }

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
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to continue",
        variant: "destructive"
      });
      router.push('/auth/signin');
      return;
    }

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
      await saveResults(assessmentResult);
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

  const saveResults = async (assessmentResult: AssessmentResult) => {
    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your results",
        variant: "destructive"
      });
      router.push('/auth/signin');
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('assessment_results')
        .insert({
          user_id: user.id,
          enneagram_type: parseInt(enneagramType || "0"),
          communication_style: assessmentResult.communicationStyle,
          emotional_style: assessmentResult.emotionalStyle,
          goal_orientation: assessmentResult.goalOrientation,
          adaptability_style: assessmentResult.adaptabilityStyle,
          rubric: assessmentResult.rubric
        });

      if (error) {
        console.error('Error saving results:', error);
        if (error.code === '23503') { // Foreign key violation
          toast({
            title: "Authentication error",
            description: "Please try logging out and back in",
            variant: "destructive"
          });
          router.push('/auth/signin');
        } else {
          toast({
            title: "Error saving results",
            description: error.message,
            variant: "destructive"
          });
        }
        return;
      }
      
      toast({
        title: "Assessment results saved!",
        description: "Your results have been saved to your profile."
      });
    } catch (error) {
      console.error('Error saving assessment results:', error);
      toast({
        title: "Error saving results",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="mb-4">Please sign in to take the assessment</p>
          <Button onClick={() => router.push('/auth/signin')}>Sign In</Button>
        </div>
      </div>
    );
  }

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
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <AssessmentStart
          onStart={handleStart}
          enneagramType={enneagramType}
          setEnneagramType={setEnneagramType}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-8">
        <ProgressBar current={currentQuestion + 1} total={questions.length} />
        <QuestionCard
          question={questions[currentQuestion]}
          selectedAnswer={answers[currentQuestion]}
          onAnswer={handleAnswer}
        />
        <AssessmentNavigation
          showPrevious={currentQuestion > 0}
          showNext={!!answers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLast={currentQuestion === questions.length - 1}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}