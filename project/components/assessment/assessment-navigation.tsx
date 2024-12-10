import { Button } from "@/components/ui/button";

interface AssessmentNavigationProps {
  showPrevious: boolean;
  showNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  isLast?: boolean;
  isLoading?: boolean;
}

export function AssessmentNavigation({
  showPrevious,
  showNext,
  onPrevious,
  onNext,
  isLast = false,
  isLoading = false
}: AssessmentNavigationProps) {
  return (
    <div className="flex justify-between max-w-2xl mx-auto">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!showPrevious}
      >
        Previous
      </Button>
      <Button
        onClick={onNext}
        disabled={!showNext || isLoading}
      >
        {isLoading ? 'Saving...' : isLast ? 'Complete Assessment' : 'Next'}
      </Button>
    </div>
  );
}