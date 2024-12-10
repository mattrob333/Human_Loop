export type Character = 'A' | 'B' | 'C' | 'D' | null;

export type Question = {
  id: number;
  text: string;
  options: {
    id: string;
    character: Character;
    description: string;
  }[];
};

export interface AssessmentResult {
  communicationStyle: string;
  emotionalStyle: string;
  goalOrientation: string;
  adaptabilityStyle: string;
  rubric: string;
}

export interface StoredAssessmentResult extends AssessmentResult {
  id: string;
  user_id: string;
  enneagram_type: number;
  created_at: string;
}