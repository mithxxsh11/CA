/* ------------------------------------------------------------------
   CHANDNI'S ACADEMY — STORYTELLING CONTENT
   Nova-inspired 5-Chapter Experience
------------------------------------------------------------------- */

export const CONTACT = {
  name: "Chandni's Academy",
  location: 'HSR Layout, Bengaluru, Karnataka, India',
  locationShort: 'HSR Layout, Bengaluru',
  phoneDisplay: '+91 87548 29969',
  phoneHref: 'tel:+918754829969',
  email: 'webmaster@chandnisacademy.com',
  website: 'https://www.chandnisacademy.com/',
  whatsapp: 'https://wa.me/918754829969',
  maps: 'https://www.google.com/maps/search/?api=1&query=Chandni%27s+Academy+HSR+Layout+Bengaluru',
  reviews: 'https://www.google.com/maps/search/?api=1&query=Chandni%27s+Academy+HSR+Layout+Bengaluru+reviews',
  beyondWordsInstagram: 'https://www.instagram.com/beyondwordscommunity/',
}

export const waLink = (text: string) => `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`

export const QUESTIONS = [
  'DO YOU WANT TO SPEAK WITH CONFIDENCE?',
  'CAN YOU EXPRESS YOUR IDEAS CLEARLY?',
  'ARE YOU READY TO FIND YOUR VOICE?',
  'WHAT IF YOUR WORDS COULD CREATE OPPORTUNITIES?',
]

export const TECHNICAL_LABELS = [
  { label: 'COMMUNICATION', num: '01', desc: 'Clarity of Expression' },
  { label: 'CONFIDENCE', num: '02', desc: 'Inner Self-Belief' },
  { label: 'EXPRESSION', num: '03', desc: 'Authentic Voice' },
  { label: 'LEADERSHIP', num: '04', desc: 'Purposeful Impact' },
]

export type PillarId = 'communicate' | 'confidence' | 'lead'

export interface PillarData {
  id: PillarId
  number: string
  word: string
  headline: string
  tagline: string
  description: string
  areas: string[]
}

export const PILLARS: PillarData[] = [
  {
    id: 'communicate',
    number: '01',
    word: 'COMMUNICATE',
    headline: 'Speak with Clarity.',
    tagline: 'Find your voice and express your thoughts with precision.',
    description:
      'Develop English communication, fluency and the ability to express ideas clearly in both personal and professional spheres.',
    areas: [
      'Spoken English',
      'Business English',
      'Grammar & Vocabulary',
      'Effective Expression',
      'Conversation Flow',
    ],
  },
  {
    id: 'confidence',
    number: '02',
    word: 'CONFIDENCE',
    headline: 'Express Without Limits.',
    tagline: 'Overcome self-doubt and build a calm, compelling presence.',
    description:
      'Build the confidence to speak, present ideas and express yourself without hesitation in front of audiences of any size.',
    areas: [
      'Personality Development',
      'Public Speaking',
      'Presentation Skills',
      'Soft Skills & Presence',
      'Interview Preparation',
    ],
  },
  {
    id: 'lead',
    number: '03',
    word: 'LEAD',
    headline: 'Make an Impact.',
    tagline: 'Influence conversations, collaborate effectively and inspire action.',
    description:
      'Develop the professional communication skills to collaborate, influence and lead teams with purpose and credibility.',
    areas: [
      'Leadership Communication',
      'Workplace Communication',
      'Corporate Training',
      'Team Collaboration',
      'Client Interaction',
    ],
  },
]

export const TRANSFORM_STAGES = [
  {
    stage: 1 as const,
    label: 'STAGE 01 — FIND YOUR VOICE',
    title: 'LEARN TO EXPRESS YOUR THOUGHTS CLEARLY.',
    description:
      'Discover how structured thinking, vocabulary selection, and natural delivery form the bedrock of clear communication.',
    quote: 'From hesitation to genuine clarity.',
  },
  {
    stage: 2 as const,
    label: 'STAGE 02 — BUILD YOUR CONFIDENCE',
    title: 'DEVELOP THE CONFIDENCE TO SPEAK, PRESENT AND CONNECT.',
    description:
      'Cultivate poise, voice projection, body language and mental ease so speaking up feels instinctive rather than intimidating.',
    quote: 'From self-doubt to authentic presence.',
  },
  {
    stage: 3 as const,
    label: 'STAGE 03 — MAKE YOUR IMPACT',
    title: 'TAKE YOUR COMMUNICATION INTO REAL SITUATIONS.',
    description:
      'Apply high-impact communication to interview panels, boardroom presentations, negotiations and collaborative leadership.',
    quote: 'From spoken words to lasting influence.',
  },
]

export const PROGRAMME_EXPLORER = [
  {
    id: 'spoken-english',
    name: 'Spoken English',
    category: 'Communication',
    desc: 'Build fluency, natural pronunciation and effortless ease in everyday spoken English through guided conversations.',
  },
  {
    id: 'personality-dev',
    name: 'Personality Development',
    category: 'Confidence',
    desc: 'Cultivate self-awareness, personal presence, interpersonal skills and positive communication habits.',
  },
  {
    id: 'public-speaking',
    name: 'Public Speaking',
    category: 'Expression',
    desc: 'Prepare, structure and deliver talks and presentations that capture and hold attention with poise.',
  },
  {
    id: 'professional-comm',
    name: 'Professional Communication',
    category: 'Leadership',
    desc: 'Refine workplace communication, meeting participation, client interactions and assertive discussions.',
  },
  {
    id: 'corporate-training',
    name: 'Corporate Training',
    category: 'Organisation',
    desc: 'Dedicated enterprise workshops designed for teams to elevate communication, collaboration and leadership impact.',
  },
]

export const ENQUIRY_OPTIONS = [
  'Communication & Spoken English',
  'Confidence Development',
  'Public Speaking & Presentations',
  'Professional Development',
  'Corporate Training',
  'Other Inquiry',
]

export const CHAPTERS = [
  { id: 1, key: 'intro', label: '01 INTRO', title: 'The Hook' },
  { id: 2, key: 'discover', label: '02 DISCOVER', title: 'Three Pillars' },
  { id: 3, key: 'transform', label: '03 TRANSFORM', title: 'Transformation' },
  { id: 4, key: 'beyond', label: '04 BEYOND', title: 'Beyond Words' },
  { id: 5, key: 'connect', label: '05 CONNECT', title: 'Connect' },
] as const
