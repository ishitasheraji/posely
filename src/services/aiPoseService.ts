import type { PoseResult, GeneratorInputs, FixPoseAnalysis, PhotoAnalysisResult, BestPhotoAnalysis, LiveCameraInstruction } from '../types/pose';

// Curated, ultra high-resolution photography assets categorized by environment & subject count
const PHOTO_IMAGES = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85', // Solo aesthetic portrait
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85', // Duo street fashion
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85', // Group laughing
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85', // Café candid
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85', // Beach sunset
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85', // Rooftop golden hour
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85', // Park urban solo
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=85', // Portrait smile
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=85', // Street walk
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=85', // Mountains travel
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85'  // Duo cozy
];

// Helper to retrieve top-tier contextual photos matching background, count, and gender preference
export function getContextualPhotos(background: string, count: number, style: string, gender: string = 'Any'): { primary: string; variants: string[]; colorGrade: string } {
  const bgLower = (background || '').toLowerCase();
  const genderLower = (gender || '').toLowerCase();
  const isSolo = count === 1;
  const isDuo = count === 2;
  const isTrio = count === 3;
  const isQuad = count === 4;

  let primary = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85';
  let variants = [
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85'
  ];

  // 1. SOLO (1 Person)
  if (isSolo) {
    if (genderLower.includes('male') && !genderLower.includes('female')) {
      primary = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85';
      variants = [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=85'
      ];
    } else {
      primary = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85';
      variants = [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=85'
      ];
    }
  } 
  // 2. DUO (Exactly 2 People)
  else if (isDuo) {
    if (genderLower.includes('male') && !genderLower.includes('female')) {
      primary = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85'; // 2 males walking
      variants = [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85'
      ];
    } else if (genderLower.includes('female')) {
      primary = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85'; // 2 female friends
      variants = [
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85'
      ];
    } else if (bgLower.includes('beach')) {
      primary = 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=85'; // 2 people beach
      variants = [
        'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85'
      ];
    } else if (bgLower.includes('rooftop')) {
      primary = 'https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1200&q=85'; // 2 people rooftop
      variants = [
        'https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85'
      ];
    } else {
      primary = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85'; // 2 people cozy duo
      variants = [
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85'
      ];
    }
  } 
  // 3. TRIO (Exactly 3 People)
  else if (isTrio) {
    primary = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85'; // 3 friends cafe/table
    variants = [
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=85'
    ];
  }
  // 4. QUAD (Exactly 4 People)
  else if (isQuad) {
    primary = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85'; // 4 friends group walk
    variants = [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=85'
    ];
  }
  // 5. LARGE GROUP (5+ People)
  else {
    primary = 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=85'; // Large group
    variants = [
      'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=85'
    ];
  }

  const styleLower = (style || '').toLowerCase();
  let colorGrade = 'Golden Hour Warmth';
  if (styleLower.includes('cinematic')) colorGrade = 'Cinematic Teal & Orange';
  else if (styleLower.includes('cool') || styleLower.includes('moody')) colorGrade = 'Deep Moody Shadow';
  else if (styleLower.includes('aesthetic') || styleLower.includes('instagram')) colorGrade = 'Pastel Soft Glow';
  else if (styleLower.includes('luxury') || styleLower.includes('formal')) colorGrade = 'High Contrast Studio Prime';

  return { primary, variants, colorGrade };
}

export const INITIAL_LIBRARY_POSES: PoseResult[] = [
  {
    id: 'pose-lib-1',
    title: 'Casual Café Candid',
    subtitle: 'Warm cozy table setup with natural laughing dynamics',
    style: 'Candid',
    peopleCount: 3,
    peopleLabel: '3 People',
    background: 'Café',
    outfit: 'Casual',
    time: 'Golden Hour',
    cameraType: 'Portrait',
    difficulty: 'Easy',
    likes: 12450,
    saves: 3890,
    isTrending: true,
    formation: {
      type: 'triangle',
      description: 'Triangle formation around the table for depth & intimate conversation flow',
      svgData: {
        people: [
          { id: 1, label: 'P1', x: 25, y: 55, role: 'Left (Table edge)' },
          { id: 2, label: 'P2', x: 50, y: 35, role: 'Center (Leaning)' },
          { id: 3, label: 'P3', x: 75, y: 55, role: 'Right (Holding cup)' }
        ],
        cameraPos: { x: 50, y: 90 }
      }
    },
    peopleInstructions: [
      {
        person: 1,
        position: 'Left side',
        body: 'Slightly turned toward center table',
        hands: 'One hand resting on cup, other arm on table',
        legs: 'Crossed under table',
        eyes: 'Look toward Person 2 while smiling',
        expression: 'Genuine warmth / laughter'
      },
      {
        person: 2,
        position: 'Center Back',
        body: 'Slightly leaning forward over table',
        hands: 'Cupping warm mug with both hands',
        legs: 'Feet planted comfortably',
        eyes: 'Direct eye contact with lens',
        expression: 'Natural laugh with open smile'
      },
      {
        person: 3,
        position: 'Right side',
        body: 'Turned 30 degrees inward',
        hands: 'Resting hand casually on friend shoulder or table edge',
        legs: 'Extended slightly forward',
        eyes: 'Glancing at camera with soft eye smile',
        expression: 'Playful grin'
      }
    ],
    camera: {
      angle: '45° eye level',
      height: 'Chest level',
      distance: '2.5 - 3 meters',
      lens: '50mm Portrait / 2x Telephoto',
      orientation: 'Portrait Mode',
      position: 'Directly facing table triangle'
    },
    backgroundSetup: {
      recommended_area: 'Corner booth by window with ambient light string bulbs',
      lighting: 'Warm golden hour sunlight filtering through glass',
      composition: 'Rule of thirds centered on group',
      depth: 'Shallow depth of field (blurred café background)',
      tips: 'Ensure coffee cups are visible on table to anchor the scene.'
    },
    expressionTip: {
      recommended: 'Natural Shared Laughter',
      alternatives: ['Warm Smile', 'Curious Look', 'Soft Candid Smile']
    },
    bodyGuide: {
      head: 'Slightly tilted inward toward friends',
      shoulders: 'Dropped & relaxed, no tension',
      hands: 'Engaged with coffee cups or table',
      body: 'Angled 20–30° to avoid flat profile',
      legs: 'Crossed casually or staggered',
      eyes: 'Soft eye contact / candid interactions'
    },
    sampleImage: PHOTO_IMAGES[0]
  },
  {
    id: 'pose-lib-2',
    title: 'Urban Sunset Stroll',
    subtitle: 'Dynamic walking formation with street aesthetic',
    style: 'Aesthetic',
    peopleCount: 4,
    peopleLabel: '4-6 People',
    background: 'Street',
    outfit: 'Oversized / Streetwear',
    time: 'Golden Hour',
    cameraType: 'Wide',
    difficulty: 'Medium',
    likes: 18900,
    saves: 5670,
    isTrending: true,
    formation: {
      type: 'walking',
      description: 'Staggered walking line moving forward together',
      svgData: {
        people: [
          { id: 1, label: 'P1', x: 20, y: 50, role: 'Outer Left' },
          { id: 2, label: 'P2', x: 40, y: 40, role: 'Center Left' },
          { id: 3, label: 'P3', x: 60, y: 42, role: 'Center Right' },
          { id: 4, label: 'P4', x: 80, y: 52, role: 'Outer Right' }
        ],
        cameraPos: { x: 50, y: 90 }
      }
    },
    peopleInstructions: [
      {
        person: 1,
        position: 'Far Left',
        body: 'Walking forward, torso angled slightly right',
        hands: 'Hand in jacket pocket',
        legs: 'Mid-stride left leg forward',
        eyes: 'Looking off-camera toward side store',
        expression: 'Cool effortless smirk'
      },
      {
        person: 2,
        position: 'Center Left',
        body: 'Upright confident stride',
        hands: 'Arm around Person 3 shoulder',
        legs: 'Right leg stepping forward',
        eyes: 'Looking straight into camera lens',
        expression: 'Confident smile'
      },
      {
        person: 3,
        position: 'Center Right',
        body: 'Laughing mid-walk',
        hands: 'Holding sunglasses or tote bag strap',
        legs: 'Left foot taking step',
        eyes: 'Looking at Person 2',
        expression: 'Joyful laugh'
      },
      {
        person: 4,
        position: 'Far Right',
        body: 'Slightly behind, leaning back casually',
        hands: 'Thumbs in denim belt loops',
        legs: 'Staggered forward stride',
        eyes: 'Looking toward camera over sunglasses',
        expression: 'Aesthetic mood'
      }
    ],
    camera: {
      angle: 'Low Angle ( waist to chest )',
      height: 'Knee to Waist level',
      distance: '4 meters',
      lens: '0.5x / 24mm Wide Angle',
      orientation: 'Portrait',
      position: 'Crouched down slightly in front of walking path'
    },
    backgroundSetup: {
      recommended_area: 'Crosswalk or brick alley with sunset backlight',
      lighting: 'Strong golden backlighting creating lens flare',
      composition: 'Low perspective making group look heroic',
      depth: 'Deep street perspective with vanishing line',
      tips: 'Have everyone walk at 50% normal pace to capture sharp steps.'
    },
    expressionTip: {
      recommended: 'Effortless Street Confidence',
      alternatives: ['Laughing mid-sentence', 'Sunglasses tilt', 'Serious fashion stance']
    },
    bodyGuide: {
      head: 'Held high, slight side turn',
      shoulders: 'Square but relaxed',
      hands: 'Pockets or holding accessories',
      body: 'Moving forward actively',
      legs: 'Captured in active stride',
      eyes: 'Dynamic glance'
    },
    sampleImage: PHOTO_IMAGES[1]
  },
  {
    id: 'pose-lib-3',
    title: 'Rooftop Golden Glow Solo',
    subtitle: 'High fashion cinematic portrait with sunset backdrop',
    style: 'Cinematic',
    peopleCount: 1,
    peopleLabel: 'Solo',
    background: 'Rooftop',
    outfit: 'Western / Formal',
    time: 'Golden Hour',
    cameraType: 'DSLR',
    difficulty: 'Easy',
    likes: 9540,
    saves: 2410,
    isTrending: false,
    formation: {
      type: 'solo',
      description: 'Single subject standing near ledge facing 45° to sun',
      svgData: {
        people: [
          { id: 1, label: 'P1', x: 50, y: 40, role: 'Subject' }
        ],
        cameraPos: { x: 50, y: 85 }
      }
    },
    peopleInstructions: [
      {
        person: 1,
        position: 'Center frame',
        body: 'Body turned 45 degrees away from camera',
        hands: 'One hand touching hair collar, other resting on waist',
        legs: 'Weight shifted to back leg, front leg bent slightly',
        eyes: 'Gazing past camera toward horizon',
        expression: 'Thoughtful cinematic gaze'
      }
    ],
    camera: {
      angle: 'Eye Level',
      height: 'Eye level (1.6 meters)',
      distance: '2 meters',
      lens: '85mm f/1.8 Portrait',
      orientation: 'Vertical / Portrait',
      position: 'Direct facing with sun 45° over shoulder'
    },
    backgroundSetup: {
      recommended_area: 'Open rooftop railing overlooking city skyline',
      lighting: 'Golden Hour side lighting creating soft facial shadow',
      composition: 'Rule of thirds with skyline grid',
      depth: 'Ultra smooth bokeh blurred city lights',
      tips: 'Let hair blow gently in the wind for motion feeling.'
    },
    expressionTip: {
      recommended: 'Serene Sunset Gaze',
      alternatives: ['Slight Smile', 'Eyes Closed Wind Catch', 'Intense Direct Look']
    },
    bodyGuide: {
      head: 'Tilted 15 degrees up',
      shoulders: 'Pushed back, spine straight',
      hands: 'Gracefully touching neck or outfit',
      body: 'S-curve body silhouetting',
      legs: 'Weight on back leg',
      eyes: 'Looking 10° above lens horizon'
    },
    sampleImage: PHOTO_IMAGES[2]
  },
  {
    id: 'pose-lib-4',
    title: 'Beachside Duo Sunset Vibe',
    subtitle: 'Playful beach couple/friend pose with ocean waves',
    style: 'Cute',
    peopleCount: 2,
    peopleLabel: '2 People',
    background: 'Beach',
    outfit: 'Casual',
    time: 'Golden Hour',
    cameraType: 'Portrait',
    difficulty: 'Easy',
    likes: 14200,
    saves: 4300,
    isTrending: true,
    formation: {
      type: 'sitting_standing',
      description: 'One sitting on sand/rock, one standing leaning over',
      svgData: {
        people: [
          { id: 1, label: 'P1', x: 35, y: 55, role: 'Sitting on rock/sand' },
          { id: 2, label: 'P2', x: 60, y: 35, role: 'Standing behind' }
        ],
        cameraPos: { x: 50, y: 85 }
      }
    },
    peopleInstructions: [
      {
        person: 1,
        position: 'Foreground sitting',
        body: 'Sitting sideways with knees drawn up',
        hands: 'Hugging knees loosely or touching sand',
        legs: 'Bent comfortably',
        eyes: 'Looking up toward Person 2',
        expression: 'Sweet happy laugh'
      },
      {
        person: 2,
        position: 'Standing background',
        body: 'Leaning slightly down toward Person 1',
        hands: 'Hands in pockets or holding hat',
        legs: 'Staggered stance in wet sand reflection',
        eyes: 'Looking down at Person 1 or lens',
        expression: 'Warm affection'
      }
    ],
    camera: {
      angle: 'Slight High Angle',
      height: 'Chest height (approx 1.3m)',
      distance: '3 meters',
      lens: '50mm',
      orientation: 'Vertical',
      position: 'Facing beach shore with tide reflection'
    },
    backgroundSetup: {
      recommended_area: 'Shoreline where waves lap gently on sand',
      lighting: 'Orange sunset sky reflected on wet sand',
      composition: 'Diagonal line connecting sitting and standing subjects',
      depth: 'Medium blurred horizon line',
      tips: 'Capture wet sand mirror reflections for dramatic look.'
    },
    expressionTip: {
      recommended: 'Warm Joyful Smile',
      alternatives: ['Playful splashing gesture', 'Looking at sunset', 'Peace sign pose']
    },
    bodyGuide: {
      head: 'Inward tilt toward partner',
      shoulders: 'Soft and natural',
      hands: 'Engaged with knees or accessories',
      body: 'Multi-level height contrast',
      legs: 'Relaxed beach posture',
      eyes: 'Connection between pair'
    },
    sampleImage: PHOTO_IMAGES[3]
  }
];

export function generatePoseData(inputs: GeneratorInputs): PoseResult {
  const count = typeof inputs.peopleCount === 'number' ? inputs.peopleCount : parseInt(String(inputs.peopleCount)) || 3;
  const gender = inputs.gender || 'Female';
  const style = inputs.style || 'Candid';
  const bg = inputs.background || 'Café';
  const outfit = inputs.outfit || 'Casual';
  const time = inputs.time || 'Golden Hour';
  const camera = inputs.camera || 'Portrait';

  const instructions: PoseResult['peopleInstructions'] = [];
  const svgPeople: { id: number; label: string; x: number; y: number; role?: string }[] = [];

  const roles = [
    'Lead / Center Anchor',
    'Left Counterbalance',
    'Right Counterbalance',
    'Back Standing Anchor',
    'Foreground Accent',
    'Side Leaner'
  ];

  for (let i = 1; i <= count; i++) {
    const isCenter = i === 1 || (count > 2 && i === Math.ceil(count / 2));
    const posX = Math.round((100 / (count + 1)) * i);
    const posY = (i % 2 === 0) ? 35 : 55;

    svgPeople.push({
      id: i,
      label: `P${i}`,
      x: posX,
      y: posY,
      role: roles[(i - 1) % roles.length]
    });

    instructions.push({
      person: i,
      label: `Person ${i}`,
      position: i === 1 ? 'Center Lead' : (i % 2 === 0 ? `Left side (Person ${i})` : `Right side (Person ${i})`),
      body: isCenter 
        ? `Chest facing camera 20° angle, posture straight and relaxed.`
        : `Turned 30° toward Person ${i === 2 ? 1 : i - 1} to create group cohesion.`,
      hands: i % 2 === 0 
        ? (gender === 'Female' ? `One hand running through hair or touching collar, other resting on hip/waist.` : `One hand in pocket, thumb hooked into belt loop.`)
        : `Holding a prop (coffee cup/sunglasses/phone) or resting hand on hip.`,
      legs: `One foot shifted slightly forward to elongate silhouette, weight on back leg.`,
      eyes: i === 1 ? `Looking directly into lens with confidence.` : `Glancing playfully toward Person 1 or side angle.`,
      expression: style === 'Funny' ? `Playful exaggerated wink / laugh` : (style === 'Cool' ? `Chic minimal smirk` : `Warm natural smile`)
    });
  }

  const photoInfo = getContextualPhotos(bg, count, style, gender);
  const mainImage = inputs.customBackgroundUrl || photoInfo.primary;

  return {
    id: `generated-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    title: `${gender !== 'Any' ? gender + ' ' : ''}${style} ${bg} ${count > 1 ? 'Group' : 'Portrait'}`,
    subtitle: `Custom AI photo direction optimized for ${gender} ${count} ${count === 1 ? 'person' : 'people'} during ${time}`,
    style,
    peopleCount: count,
    peopleLabel: `${count} ${count === 1 ? 'Person' : 'People'} (${gender})`,
    background: bg,
    outfit,
    time,
    cameraType: camera,
    gender,
    difficulty: count > 3 ? 'Advanced' : 'Easy',
    likes: Math.floor(Math.random() * 8000) + 1200,
    saves: Math.floor(Math.random() * 3000) + 400,
    isTrending: true,
    formation: {
      type: count === 1 ? 'solo' : (count === 2 ? 'duo' : (count === 3 ? 'triangle' : 'v_shape')),
      description: count === 1 
        ? 'Single focal point with balanced background framing'
        : `Dynamic ${count}-person ${count <= 3 ? 'triangle' : 'V-formation'} maximizing visual interest and preventing clutter.`,
      svgData: {
        people: svgPeople,
        cameraPos: { x: 50, y: 90 }
      }
    },
    peopleInstructions: instructions,
    camera: {
      angle: camera === 'DSLR' ? '30° slight low angle' : 'Chest height eye level',
      height: camera === 'Wide' ? 'Knee to Waist level' : 'Chest Level (1.4m)',
      distance: `${Math.max(2, count * 0.9).toFixed(1)} meters`,
      lens: camera === 'Wide' ? '0.5x Ultra Wide' : (camera === 'DSLR' ? '85mm Prime' : '2x Telephoto Portrait'),
      orientation: 'Portrait Mode (Vertical)',
      position: 'Centered directly aligned with group apex'
    },
    backgroundSetup: {
      recommended_area: `Position near ${bg.toLowerCase()} architectural feature or window`,
      lighting: time === 'Golden Hour' ? 'Warm side sunlight creating natural rim light' : 'Soft diffused ambient light',
      composition: 'Rule of thirds with head height at top line',
      depth: 'Medium depth of field blurring busy backdrop',
      tips: `Position background elements like ${bg.toLowerCase()} decor behind open gaps between people.`
    },
    expressionTip: {
      recommended: style === 'Moody' ? 'Intense Serene Stare' : 'Spontaneous Shared Laugh',
      alternatives: ['Soft Eye-Smile (Duchenne)', 'Candid Side Glare', 'Playful Exaggerated Wink']
    },
    bodyGuide: {
      head: 'Tilted 10–15° toward center for group warmth',
      shoulders: 'Rolled back and down, never slouching',
      hands: 'Keep hands visible; avoid flat hanging arms',
      body: 'Angled slightly to narrow side profile',
      legs: 'Crossed ankles or staggered stepping foot',
      eyes: 'Focus 2 inches above camera lens for bright eyes'
    },
    sampleImage: mainImage,
    sampleImageVariants: photoInfo.variants,
    colorGradePreset: photoInfo.colorGrade,
    recommendedProps: bg.toLowerCase().includes('caf') 
      ? ['☕ Ceramic Coffee Mug / Iced Latte', '📖 Vintage Book or Journal', '🕶️ Retro Sunglasses']
      : (bg.toLowerCase().includes('beach')
        ? ['🕶️ Retro Sunglasses', '👒 Straw Sun Hat', '🥤 Refreshing Drink']
        : (bg.toLowerCase().includes('street') || bg.toLowerCase().includes('urban')
          ? ['🧥 Oversized Jacket / Denim', '📱 Smartphone / Camera', '☕ Takeout Cup']
          : ['🕶️ Sunglasses / Glasses', '📱 Smartphone Accent', '🧥 Layered Outfit Prop']))
  };
}

export function generateMultipleSessionPoses(inputs: GeneratorInputs, count: number = 10): PoseResult[] {
  const styles = ['Candid Laugh', 'Walking Stroll', 'Sitting Cozy', 'Funny Motion', 'Close-up Detail', 'Back-Facing Sunset', 'Individual Lead', 'Dynamic Angle', 'Cinematic Wide', 'Editorial Fashion'];
  
  return styles.slice(0, count).map((styleName, idx) => {
    const result = generatePoseData({ ...inputs, style: styleName });
    result.id = `session-pose-${idx}-${Date.now()}`;
    result.title = `#${idx + 1} — ${styleName} ${inputs.background}`;
    return result;
  });
}

export function analyzeFixPoseImage(imageUrl: string): FixPoseAnalysis {
  return {
    id: `fix-${Date.now()}`,
    imageUrl,
    detectedIssues: [
      { severity: 'error', message: 'Person 3 is partially hidden behind Person 1.' },
      { severity: 'error', message: 'Group spacing is uneven with a large gap on the left.' },
      { severity: 'warning', message: 'Camera angle is too high causing shortened torso proportions.' },
      { severity: 'info', message: 'Hands are hanging stiffly by the sides.' }
    ],
    recommendations: [
      { target: 'Person 1', action: 'Move 2 steps left and turn shoulders 20° right.' },
      { target: 'Person 2', action: 'Step slightly forward into center focal point.' },
      { target: 'Person 3', action: 'Move out from behind Person 1; stand on far right.' },
      { target: 'Camera', action: 'Lower camera from eye height down to chest level.' }
    ],
    improvedFormationDiagram: {
      type: 'v_shape',
      description: 'Corrected V-formation with equal line-of-sight for all members',
      svgData: {
        people: [
          { id: 1, label: 'P1', x: 25, y: 45, role: 'Left Anchor' },
          { id: 2, label: 'P2', x: 50, y: 35, role: 'Center Lead' },
          { id: 3, label: 'P3', x: 75, y: 45, role: 'Right Anchor' }
        ],
        cameraPos: { x: 50, y: 90 }
      }
    },
    correctedPoseSummary: 'Everyone is now fully visible with equal triangle spacing, lower camera height, and relaxed hand positioning.'
  };
}

export function selectBestPhotos(images: string[]): BestPhotoAnalysis {
  const photoResults: PhotoAnalysisResult[] = images.map((img, idx) => {
    const isWinner = idx === 0 || idx === 2;
    const score = isWinner ? Math.floor(Math.random() * 6) + 93 : Math.floor(Math.random() * 15) + 75;

    return {
      id: `photo-${idx + 1}`,
      imageUrl: img,
      overallScore: score,
      subScores: {
        expression: isWinner ? 96 : 82,
        composition: isWinner ? 94 : 78,
        lighting: isWinner ? 92 : 84,
        groupPosition: isWinner ? 95 : 76,
        sharpness: isWinner ? 98 : 88,
        visibility: isWinner ? 99 : 80
      },
      summary: isWinner 
        ? '🏆 Clear winner! All eyes are open, facial expressions are natural, and group triangle formation is perfectly balanced.'
        : 'Good capture, but Person 2 is slightly out of focus and lighting shadow is cast on Person 3.',
      highlights: isWinner 
        ? ['Optimal 45° facial angle', 'Zero closed eyes detected', 'Even spacing & leading lines', 'Warm golden hour exposure']
        : ['Slight facial blur on right edge', 'Uneven group height balancing'],
      improvements: isWinner
        ? ['Crop top 5% empty sky space for hyper-focused composition']
        : ['Tell Person 2 to lean slightly forward into focus plane']
    };
  });

  photoResults.sort((a, b) => b.overallScore - a.overallScore);

  return {
    bestPhotoId: photoResults[0].id,
    photos: photoResults,
    comparisonSummary: `Photo #${photoResults[0].id.replace('photo-', '')} achieved the top score of ${photoResults[0].overallScore}/100 due to superior face visibility, natural laughs, and zero occlusions.`
  };
}

export function getLiveCameraInstruction(step: number): LiveCameraInstruction {
  const instructions: LiveCameraInstruction[] = [
    {
      status: 'AI ANALYZING',
      statusColor: 'violet',
      primaryMessage: 'Scanning faces & group alignment...',
      actionDirectives: ['Hold camera steady', 'Ensure all friends are in frame'],
      alignmentOk: false
    },
    {
      status: 'AI READY',
      statusColor: 'violet',
      primaryMessage: '↔️ Move Person 3 slightly right',
      actionDirectives: ['Person 3 step 20cm right', 'Person 1 turn shoulders inward'],
      alignmentOk: false
    },
    {
      status: 'AI READY',
      statusColor: 'violet',
      primaryMessage: '👥 Come 20 cm closer together',
      actionDirectives: ['Close the gap on the left', 'Person 2 lean forward over table'],
      alignmentOk: false
    },
    {
      status: 'AI READY',
      statusColor: 'violet',
      primaryMessage: '👀 Everyone look toward the camera',
      actionDirectives: ['Person 1 look into lens', 'Natural soft smile'],
      alignmentOk: false
    },
    {
      status: 'PERFECT COMPOSITION',
      statusColor: 'green',
      primaryMessage: '🟢 Perfect! Great composition. Take the photo! 📸',
      actionDirectives: ['All subjects in focus', 'Golden hour backlight balanced', 'Zero occlusions'],
      alignmentOk: true
    }
  ];

  return instructions[step % instructions.length];
}
