import { Question } from '@/types/assessment';

export const questions: Question[] = [
  {
    id: 1,
    text: "When you're leading a team through a challenging project, which character do you resonate with most?",
    options: [
      {
        id: 'a',
        character: {
          name: 'Captain America',
          description: 'Leads with integrity, communicates with clarity, and adapts with resilience.',
          traits: { Comm: '🔊', Emo: '🛡️', Goal: '👑', Adapt: '🌊' }
        }
      },
      {
        id: 'b',
        character: {
          name: 'Tony Stark',
          description: 'Innovates under pressure, communicates with wit, and adapts with resourcefulness.',
          traits: { Comm: '🎢', Emo: '🚀', Goal: '🧬', Adapt: '🛠️' }
        }
      },
      {
        id: 'c',
        character: {
          name: 'Dumbledore',
          description: 'Guides with wisdom, communicates with thoughtfulness, and adapts with foresight.',
          traits: { Comm: '📚', Emo: '🕊️', Goal: '🌌', Adapt: '🔭' }
        }
      },
      {
        id: 'd',
        character: {
          name: 'Leslie Knope',
          description: 'Organizes with enthusiasm, communicates with supportiveness, and adapts with optimism.',
          traits: { Comm: '💬', Emo: '🎉', Goal: '📊', Adapt: '🌬️' }
        }
      }
    ]
  }
  // Additional questions will be added here
];

export const enneagramTypes = [
  { value: '1', label: '1 - The Perfectionist' },
  { value: '2', label: '2 - The Helper' },
  { value: '3', label: '3 - The Achiever' },
  { value: '4', label: '4 - The Individualist' },
  { value: '5', label: '5 - The Investigator' },
  { value: '6', label: '6 - The Loyalist' },
  { value: '7', label: '7 - The Enthusiast' },
  { value: '8', label: '8 - The Challenger' },
  { value: '9', label: '9 - The Peacemaker' }
];