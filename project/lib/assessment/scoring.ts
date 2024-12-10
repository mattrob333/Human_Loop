import { Character, AssessmentResult } from '@/types/assessment';

const characterTraits = {
  'Captain America': { comm: 'Direct', emo: 'Rational', goal: 'Achievement', adapt: 'Structured' },
  'Tony Stark': { comm: 'Analytical', emo: 'Reserved', goal: 'Growth', adapt: 'Methodical' },
  'Dumbledore': { comm: 'Empathetic', emo: 'Expressive', goal: 'Harmony', adapt: 'Flexible' },
  'Leslie Knope': { comm: 'Collaborative', emo: 'Intuitive', goal: 'Balance', adapt: 'Adaptive' },
  'Gandalf': { comm: 'Empathetic', emo: 'Intuitive', goal: 'Harmony', adapt: 'Flexible' },
  'Sherlock Holmes': { comm: 'Analytical', emo: 'Reserved', goal: 'Growth', adapt: 'Methodical' },
  'Elon Musk': { comm: 'Direct', emo: 'Rational', goal: 'Achievement', adapt: 'Structured' },
  'Andy Dufresne': { comm: 'Reserved', emo: 'Rational', goal: 'Growth', adapt: 'Methodical' },
  'Spock': { comm: 'Analytical', emo: 'Reserved', goal: 'Growth', adapt: 'Structured' },
  'Hermione Granger': { comm: 'Analytical', emo: 'Reserved', goal: 'Achievement', adapt: 'Structured' },
  'Forrest Gump': { comm: 'Direct', emo: 'Expressive', goal: 'Harmony', adapt: 'Flexible' },
  'Mark Zuckerberg': { comm: 'Analytical', emo: 'Reserved', goal: 'Growth', adapt: 'Methodical' },
  'Elizabeth McCord': { comm: 'Empathetic', emo: 'Intuitive', goal: 'Harmony', adapt: 'Adaptive' }
};

export function calculateResults(enneagramType: number, answers: Character[]): AssessmentResult {
  // Initialize scores for each trait category
  const scores = {
    comm: {} as Record<string, number>,
    emo: {} as Record<string, number>,
    goal: {} as Record<string, number>,
    adapt: {} as Record<string, number>
  };

  // Tally scores for each trait category
  answers.forEach(character => {
    if (!character) return;
    const traits = characterTraits[character.name];
    if (!traits) {
      console.error('No traits found for character:', character.name);
      return;
    }

    // Increment scores for each trait
    scores.comm[traits.comm] = (scores.comm[traits.comm] || 0) + 1;
    scores.emo[traits.emo] = (scores.emo[traits.emo] || 0) + 1;
    scores.goal[traits.goal] = (scores.goal[traits.goal] || 0) + 1;
    scores.adapt[traits.adapt] = (scores.adapt[traits.adapt] || 0) + 1;
  });

  // Find most common trait in each category
  const getHighestTrait = (category: Record<string, number>): string => {
    const maxScore = Math.max(...Object.values(category));
    return Object.entries(category).find(([_, score]) => score === maxScore)?.[0] || '';
  };

  const communicationStyle = getHighestTrait(scores.comm);
  const emotionalStyle = getHighestTrait(scores.emo);
  const goalOrientation = getHighestTrait(scores.goal);
  const adaptabilityStyle = getHighestTrait(scores.adapt);

  // Generate rubric string
  const rubric = `🧬Enn:  ⚛${enneagramType} | 🗣Comm:  ${communicationStyle}  | 🫀Emo:  ${emotionalStyle}  | 🎯Goal:  ${goalOrientation}  | 🔄Adapt:  ${adaptabilityStyle}`;

  return {
    enneagramType,
    communicationStyle,
    emotionalStyle,
    goalOrientation,
    adaptabilityStyle,
    rubric
  };
}