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
  },
  {
    id: 2,
    text: "When faced with team conflict, which character's approach do you emulate?",
    options: [
      {
        id: 'a',
        character: {
          name: 'Gandalf',
          description: 'Resolves conflict with a focus on the bigger picture and a calming presence.',
          traits: { Comm: '📚', Emo: '⚖️', Goal: '🌐', Adapt: '🌳' }
        }
      },
      {
        id: 'b',
        character: {
          name: 'Miranda Priestly',
          description: 'Takes a direct and authoritative stance to quickly address and resolve disputes.',
          traits: { Comm: '📢', Emo: '🏛️', Goal: '📐', Adapt: '🏰' }
        }
      },
      {
        id: 'c',
        character: {
          name: 'Michael Scott',
          description: 'Attempts to defuse tension with humor and seeks a harmonious resolution.',
          traits: { Comm: '🎢', Emo: '🎈', Goal: '👑', Adapt: '🎡' }
        }
      },
      {
        id: 'd',
        character: {
          name: 'Furiosa',
          description: 'Faces conflict head-on with intensity and a drive to find immediate solutions.',
          traits: { Comm: '📢', Emo: '🌋', Goal: '🏹', Adapt: '🌪️' }
        }
      }
    ]
  },
  {
    id: 3,
    text: "How do you communicate a new vision to your team?",
    options: [
      {
        id: 'a',
        character: {
          name: 'Steve Jobs',
          description: 'Articulates a compelling and innovative vision that inspires change and disruption.',
          traits: { Comm: '📣', Emo: '🔥', Goal: '🧬', Adapt: '🚀' }
        }
      },
      {
        id: 'b',
        character: {
          name: 'Atticus Finch',
          description: "Shares a vision with integrity and moral clarity, aiming to do what is right.",
          traits: { Comm: '✒️', Emo: '❤️', Goal: '⚖️', Adapt: '🌬️' }
        }
      },
      {
        id: 'c',
        character: {
          name: 'Sherlock Holmes',
          description: 'Presents a vision with meticulous detail and logical reasoning.',
          traits: { Comm: '🔍', Emo: '🧠', Goal: '🔬', Adapt: '🛤️' }
        }
      },
      {
        id: 'd',
        character: {
          name: 'Moana',
          description: 'Communicates with determination and an adventurous spirit, encouraging others to explore new horizons.',
          traits: { Comm: '🎨', Emo: '🎉', Goal: '🛫', Adapt: '🛶' }
        }
      }
    ]
  },
  {
    id: 4,
    text: "What is your approach to setting and pursuing goals?",
    options: [
      {
        id: 'a',
        character: {
          name: 'Arya Stark',
          description: 'Sets personal goals with fierce determination and a relentless pursuit of growth.',
          traits: { Comm: '📢', Emo: '🔥', Goal: '🏹', Adapt: '🌪️' }
        }
      },
      {
        id: 'b',
        character: {
          name: 'Jean-Luc Picard',
          description: 'Strategizes goals with a focus on teamwork and collective success.',
          traits: { Comm: '📚', Emo: '⚖️', Goal: '🌐', Adapt: '📦' }
        }
      },
      {
        id: 'c',
        character: {
          name: 'Elon Musk',
          description: 'Aims for futuristic and groundbreaking goals that challenge the status quo.',
          traits: { Comm: '📣', Emo: '🚀', Goal: '🧬', Adapt: '🚜' }
        }
      },
      {
        id: 'd',
        character: {
          name: 'Mary Poppins',
          description: 'Approaches goal setting with a magical touch, ensuring a nurturing and positive environment.',
          traits: { Comm: '💬', Emo: '🎈', Goal: '🎭', Adapt: '🌬️' }
        }
      }
    ]
  },
  {
    id: 5,
    text: "How do you celebrate team achievements and successes?",
    options: [
      {
        id: 'a',
        character: {
          name: 'Andy Dufresne',
          description: 'Emphasizes the significance of hope and long-term vision in celebrations.',
          traits: { Comm: '✒️', Emo: '🛡️', Goal: '🌌', Adapt: '🌄' }
        }
      },
      {
        id: 'b',
        character: {
          name: 'Willy Wonka',
          description: 'Creates a sense of wonder and creativity in celebrating achievements.',
          traits: { Comm: '🎨', Emo: '🎉', Goal: '🎭', Adapt: '🎪' }
        }
      },
      {
        id: 'c',
        character: {
          name: 'King Leonidas',
          description: "Celebrates with intensity, highlighting the team's strength and determination.",
          traits: { Comm: '🔊', Emo: '🌋', Goal: '👑', Adapt: '🌊' }
        }
      },
      {
        id: 'd',
        character: {
          name: 'Elizabeth Bennett',
          description: 'Focuses on relationships and shared experiences as the foundation of success.',
          traits: { Comm: '✒️', Emo: '❤️', Goal: '🗺️', Adapt: '🌬️' }
        }
      }
    ]
  },
  {
    id: 6,
    text: "When unexpected changes occur, which character's adaptability do you channel?",
    options: [
      {
        id: 'a',
        character: {
          name: 'Doctor Who',
          description: 'Adapts with creativity and a readiness to embrace new adventures.',
          traits: { Comm: '🎨', Emo: '💡', Goal: '🛫', Adapt: '🌪️' }
        }
      },
      {
        id: 'b',
        character: {
          name: 'Katniss Everdeen',
          description: "Shows resilience and a survivalist's instinct to adjust to new challenges.",
          traits: { Comm: '📢', Emo: '🛡️', Goal: '🏹', Adapt: '🌊' }
        }
      },
      {
        id: 'c',
        character: {
          name: 'Spock',
          description: 'Responds to changes with logic and a reliance on factual information.',
          traits: { Comm: '🔍', Emo: '🧠', Goal: '🔬', Adapt: '📦' }
        }
      },
      {
        id: 'd',
        character: {
          name: 'Jack Sparrow',
          description: 'Navigates changes with unpredictability and a focus on personal freedom.',
          traits: { Comm: '🎢', Emo: '🎉', Goal: '🛫', Adapt: '🎡' }
        }
      }
    ]
  },
  {
    id: 7,
    text: "In communicating complex information, which character's style do you adopt?",
    options: [
      {
        id: 'a',
        character: {
          name: 'Neil deGrasse Tyson',
          description: 'Explains complex concepts with clarity and an engaging educational approach.',
          traits: { Comm: '📣', Emo: '💡', Goal: '🔬', Adapt: '🛶' }
        }
      },
      {
        id: 'b',
        character: {
          name: 'Mr. Miyagi',
          description: 'Communicates with patience and a focus on deep understanding and mastery.',
          traits: { Comm: '🌿', Emo: '🕊️', Goal: '🗺️', Adapt: '🌳' }
        }
      },
      {
        id: 'c',
        character: {
          name: 'Jordan Belfort',
          description: 'Uses persuasive communication to convey complex ideas with an emphasis on success.',
          traits: { Comm: '🎢', Emo: '🌋', Goal: '🏆', Adapt: '🌪️' }
        }
      },
      {
        id: 'd',
        character: {
          name: 'Hermione Granger',
          description: 'Prepares thoroughly to communicate information with precision and a deep level of detail.',
          traits: { Comm: '✒️', Emo: '🧠', Goal: '📐', Adapt: '📦' }
        }
      }
    ]
  },
  {
    id: 8,
    text: "How do you demonstrate resilience in the face of personal challenges?",
    options: [
      {
        id: 'a',
        character: {
          name: 'Rocky Balboa',
          description: 'Exhibits unwavering determination and a commitment to training and overcoming obstacles.',
          traits: { Comm: '🔊', Emo: '🔒', Goal: '🏆', Adapt: '🚜' }
        }
      },
      {
        id: 'b',
        character: {
          name: 'Rey',
          description: 'Relies on self-reliance and a spirit of discovery to navigate personal challenges.',
          traits: { Comm: '🎨', Emo: '💡', Goal: '🌌', Adapt: '🌬️' }
        }
      },
      {
        id: 'c',
        character: {
          name: 'Forrest Gump',
          description: 'Approaches challenges with simplicity and authenticity, staying true to core values.',
          traits: { Comm: '🍃', Emo: '🎈', Goal: '👐', Adapt: '🌼' }
        }
      },
      {
        id: 'd',
        character: {
          name: 'Walter White',
          description: 'Maintains control and applies intense focus to master and overcome challenges.',
          traits: { Comm: '🔍', Emo: '🌋', Goal: '🧬', Adapt: '🏗️' }
        }
      }
    ]
  },
  {
    id: 9,
    text: "During brainstorming sessions, which character's contribution style do you mirror?",
    options: [
      {
        id: 'a',
        character: {
          name: 'Don Draper',
          description: 'Contributes bold, creative ideas that aim to shift perspectives and inspire new directions.',
          traits: { Comm: '📣', Emo: '🔥', Goal: '🎭', Adapt: '🎪' }
        }
      },
      {
        id: 'b',
        character: {
          name: 'Luna Lovegood',
          description: 'Offers imaginative and unconventional ideas that challenge conventional thinking.',
          traits: { Comm: '🎨', Emo: '🌈', Goal: '🌌', Adapt: '🌬️' }
        }
      },
      {
        id: 'c',
        character: {
          name: 'Mark Zuckerberg',
          description: 'Focuses on practical and efficient solutions that leverage cutting-edge technology.',
          traits: { Comm: '🔍', Emo: '🧠', Goal: '🧬', Adapt: '🛠️' }
        }
      },
      {
        id: 'd',
        character: {
          name: 'Oprah Winfrey',
          description: 'Shares empathetic insights and compelling narratives that resonate with the audience.',
          traits: { Comm: '💬', Emo: '❤️', Goal: '🌐', Adapt: '🌳' }
        }
      }
    ]
  },
  {
    id: 10,
    text: "What is your mentoring style akin to?",
    options: [
      {
        id: 'a',
        character: {
          name: 'Yoda',
          description: 'Provides guidance that encourages self-discovery and reflection on deeper truths.',
          traits: { Comm: '🌿', Emo: '🕊️', Goal: '🗺️', Adapt: '🌬️' }
        }
      },
      {
        id: 'b',
        character: {
          name: 'Mr. Rogers',
          description: 'Mentors with compassion, fostering emotional growth and understanding.',
          traits: { Comm: '💬', Emo: '❤️', Goal: '🤝', Adapt: '🌳' }
        }
      },
      {
        id: 'c',
        character: {
          name: 'Gordon Ramsay',
          description: 'Challenges mentees with high standards, pushing them to develop their skills.',
          traits: { Comm: '🔊', Emo: '🌋', Goal: '🏆', Adapt: '🚜' }
        }
      },
      {
        id: 'd',
        character: {
          name: 'Elizabeth McCord',
          description: 'Offers strategic advice, helping mentees navigate complex situations with diplomacy.',
          traits: { Comm: '✒️', Emo: '⚖️', Goal: '🗺️', Adapt: '🛤️' }
        }
      }
    ]
  }
];