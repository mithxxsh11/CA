/* ------------------------------------------------------------------
   IMAGE MANIFEST
   Every photograph on the site is referenced here by key.
   To add real photography:
     1. Put optimised files in /public/images/ (WebP or AVIF, ~2400px
        wide for full-bleed, ~1400px for others).
     2. Set `src` (and optionally `srcSet`) for that key.
   Until `src` is set, an art-directed placeholder plate is shown with
   the brief below, so nothing is broken and nothing is misrepresented.

   Do not use generated or stock images to depict the founder or real
   students. Stock imagery should be captioned as illustrative.
------------------------------------------------------------------- */

export type Tone = 'night' | 'dusk' | 'ivory' | 'warm'

export type ImageEntry = {
  alt: string
  brief: string
  word: string
  tone: Tone
  light?: [number, number]
  src?: string
  srcSet?: string
}

export const IMAGES = {
  hero: {
    alt: 'An Indian professional woman leading a communication training session in a modern office',
    brief: 'Woman leading a communication session · warm window light · navy grade',
    word: 'voice',
    tone: 'night',
    light: [78, 18],
  },
  communicate: {
    alt: 'An Indian professional speaking confidently during a meeting',
    brief: 'Professional speaking confidently in a meeting',
    word: 'clarity',
    tone: 'warm',
    light: [22, 25],
  },
  confidence: {
    alt: 'A professional woman delivering a presentation to an engaged audience',
    brief: 'Woman presenting to an engaged audience · full-width',
    word: 'presence',
    tone: 'dusk',
    light: [62, 30],
  },
  lead: {
    alt: 'Indian professionals collaborating in a modern corporate boardroom',
    brief: 'Leader presenting ideas to a team in a boardroom',
    word: 'impact',
    tone: 'night',
    light: [30, 20],
  },
  leadDetail: {
    alt: 'Close view of a team discussion around a boardroom table',
    brief: 'Detail · hands, notes, a team in discussion',
    word: 'purpose',
    tone: 'dusk',
    light: [70, 60],
  },
  about: {
    alt: 'A calm, modern professional learning environment',
    brief: 'Modern learning space · natural light',
    word: 'becoming',
    tone: 'ivory',
    light: [80, 10],
  },
  founder: {
    alt: 'Portrait of founder Chandni Galagali (photograph to be supplied)',
    brief: 'Founder portrait · to be supplied by the academy',
    word: 'vision',
    tone: 'warm',
    light: [30, 15],
  },
  corporate: {
    alt: 'Corporate professionals in a team discussion in a boardroom',
    brief: 'Boardroom team discussion · dark navy grade',
    word: 'teams',
    tone: 'night',
    light: [85, 30],
  },
  beyond: {
    alt: 'Adults in conversation at a community communication meetup',
    brief: 'Community conversation · warm, candid',
    word: 'connection',
    tone: 'warm',
    light: [50, 10],
  },
  // Programme cards (one per pillar group, reused with varied light)
  progCommunicate: { alt: 'Adults practising English conversation in pairs', brief: 'Conversation practice', word: 'fluency', tone: 'ivory', light: [20, 20] },
  progConfidence: { alt: 'A learner practising a presentation', brief: 'Presentation practice', word: 'courage', tone: 'warm', light: [70, 15] },
  progLead: { alt: 'A manager facilitating a team workshop', brief: 'Team workshop', word: 'influence', tone: 'dusk', light: [40, 30] },
  // Gallery
  g1: { alt: 'A professional communication workshop in progress', brief: 'Communication workshop', word: 'workshop', tone: 'night', light: [70, 20] },
  g2: { alt: 'Adults participating in a group discussion', brief: 'Group discussion', word: 'dialogue', tone: 'ivory', light: [20, 30] },
  g3: { alt: 'A learner practising a presentation', brief: 'Presentation practice', word: 'delivery', tone: 'warm', light: [60, 10] },
  g4: { alt: 'A corporate training session in a meeting room', brief: 'Corporate session', word: 'teams', tone: 'dusk', light: [30, 20] },
  g5: { alt: 'A one-to-one coaching conversation', brief: 'One-to-one coaching', word: 'attention', tone: 'warm', light: [80, 40] },
  g6: { alt: 'A public speaking activity in front of a small audience', brief: 'Public speaking', word: 'stage', tone: 'night', light: [50, 10] },
  g7: { alt: 'A modern, light-filled learning space', brief: 'Learning environment', word: 'space', tone: 'ivory', light: [90, 20] },
  g8: { alt: 'Professionals in conversation after a session', brief: 'Professional interaction', word: 'network', tone: 'dusk', light: [20, 50] },
} satisfies Record<string, ImageEntry>

export type ImageKey = keyof typeof IMAGES
