import { HeadshotStyle, StyleOption } from './types';

export const HEADSHOT_STYLES: StyleOption[] = [
  {
    id: HeadshotStyle.PORTRA,
    label: 'Kodak Portra 400',
    description: 'Warm, cinematic, soft window light.',
    promptModifier: 'Professional portrait of the same person from the reference photos. Preserve their exact facial features, hair, and skin tone. Style: 35 mm photograph shot on Kodak Portra 400, warm cinematic colour, soft and natural. Composition and pose: Half-body portrait, subject seated or standing at a slight angle (10–20°) to the camera. Camera slightly above eye level, subject’s head gently turned toward the lens, chin slightly down to define jawline. Relaxed shoulders, gentle confident expression, subtle smile in the eyes. Lighting: Soft window light or large softbox from one side at 45°, with gentle falloff on the far cheek (classic Rembrandt triangle). Warm, rich midtones, creamy highlights, very soft shadows. Background softly blurred, neutral wall or studio backdrop in muted tones (beige, grey, or olive), no distractions. Technical: Shot on a full-frame camera with an 85 mm lens at f/1.8, shallow depth of field, crisp focus on the eyes. Fine 35 mm film grain, slight halation around highlights, natural colour grading—no heavy retouching, keep skin texture realistic and flattering. Goal: Looks like a modern editorial headshot suitable for LinkedIn and portfolio, timeless, tasteful, and flattering, using the most flattering angle from the reference images.'
  },
  {
    id: HeadshotStyle.CINESTILL,
    label: 'CineStill 800T',
    description: 'Moody night portrait, cinematic, cool tones.',
    promptModifier: 'Portrait of the same person from the reference photos, identity perfectly preserved. Style: 35 mm night portrait on CineStill 800T, cinematic, slightly nostalgic. Composition and pose: Chest-up portrait outdoors at night. Subject centered, facing camera, body slightly angled, head gently turned. Calm but confident expression, soft smile or thoughtful gaze just past the lens. Use the side of the face that looks best in the reference photos. Lighting and background: Tungsten streetlights or practical lights behind the subject, creating colorful bokeh (red, cyan, warm white). Main light: a soft, warm key light from one side, mimicking a nearby shop window or sign. Cool shadows, warm highlights, subtle halation around bright points of light. Background dark and soft-blurred, hint of city or parking lot, but no sharp details. Technical: Shot on a full-frame camera with a 50 mm lens at f/1.4. Strong separation between subject and background, shallow depth of field. Visible film grain and cinematic contrast, slightly teal shadows and amber highlights. Goal: Artistic yet professional portrait with a “movie still” feeling, suitable for a creative or tech portfolio.'
  },
  {
    id: HeadshotStyle.MONOCHROME,
    label: 'Ilford HP5 B&W',
    description: 'High contrast black & white, fine art look.',
    promptModifier: 'Black and white portrait of the same person, keeping their real face and proportions. Style: Ilford HP5 Plus 400, high-contrast fine-art look. Composition and pose: Three-quarter body or half-body portrait against a plain dark background. Subject in a tailored jacket, simple dark top, or professional outfit. Strong, composed posture, arms relaxed or lightly crossed. Head turned slightly to their best side, eyes looking directly into the camera, neutral but powerful expression. Lighting: Single hard light from one side at 45° creating strong shadows and sculpted cheekbones. Deep blacks, bright whites, clear separation between lit side and shadow side. Slight rim light or reflected fill on the shadow side to keep detail in the hair and jawline. Technical: Medium-format digital look with an 80 mm lens at f/4 for more depth of field and crisp detail. Fine grain, very sharp, subtle vignette, no colour—pure monochrome tones. Goal: Feels like a classic editorial or fine-art fashion portrait: bold, serious, and highly professional.'
  },
  {
    id: HeadshotStyle.LIFESTYLE,
    label: 'Natural Lifestyle',
    description: 'Window light, approachable, modern.',
    promptModifier: 'Portrait of the same person from the reference images, natural and approachable, perfect for LinkedIn and personal website. Composition and pose: Half-body portrait sitting near a large window. Subject angled slightly toward the light, shoulders relaxed. Camera at or slightly above eye level. Gentle, genuine smile, soft eye contact with the viewer, relaxed hands visible (resting on lap, table, or crossed loosely). Lighting and environment: Soft daylight from the window, creating smooth gradients on the face, minimal shadows. Background: blurred interior with subtle details (plants, bookshelves, a laptop or desk) to suggest a professional environment without clutter. Warm, earthy colour palette—browns, greens, creams. Technical: 50 mm lens at f/2.0, sharp focus on the eyes, shallow depth of field. Clean, modern colour grading with slight warmth; keep skin texture realistic, light retouching only. Goal: Friendly, trustworthy portrait that looks like a high-end lifestyle photo rather than a stiff corporate headshot.'
  },
  {
    id: HeadshotStyle.DRAMATIC,
    label: 'Dramatic Chiaroscuro',
    description: 'Tight close-up, artistic lighting.',
    promptModifier: 'Tight close-up portrait of the same person, focusing on eyes and skin texture, identity perfectly preserved. Composition and pose: Frame from forehead to just below the lips, filling the frame with the face. Subject turned slightly to their best side, eyes looking straight at the viewer. Neutral or contemplative expression, relaxed features. Lighting: Strong directional light from a narrow window or spotlight, falling across one eye and cheek, leaving part of the face in shadow (chiaroscuro). Warm golden tone in highlights, rich deep shadows, high microcontrast on skin texture. Background fully dark and out of focus. Technical: 85 mm lens at f/2.0 on a full-frame camera. Very sharp focus on the iris of the nearer eye, shallow depth of field. Cinematic colour grading with subtle warm highlights and cooler shadows. Goal: Artistic, gallery-style portrait usable in a creative portfolio or as a striking profile photo.'
  },
  {
    id: HeadshotStyle.FOUNDER,
    label: 'Tech Founder',
    description: 'Clean studio, confident, neutral backdrop.',
    promptModifier: 'Professional studio portrait of the same person, suitable for LinkedIn, press kits, and product launches. Composition and pose: Mid-shot (from chest up), subject centered. Neutral posture, arms relaxed or lightly crossed, shoulders open. Confident but friendly expression, small smile, strong eye contact. Lighting and background: Classic three-point studio lighting: soft key light at 45°, soft fill on opposite side, subtle hair light from behind. Even, flattering light with minimal shadows under eyes and nose. Smooth, solid colour backdrop (light grey, pale blue, or off-white) with a very subtle gradient. Technical: Modern mirrorless camera look, 70–200 mm lens around 135 mm at f/3.2 for flattering compression and enough depth of field. Ultra-clean image, no heavy grain, very sharp but with gentle skin smoothing while preserving pores. Goal: Crisp, contemporary “tech founder / startup leader” aesthetic that still feels human and approachable.'
  },
  {
    id: HeadshotStyle.OFFICE,
    label: 'Workspace',
    description: 'Environmental portrait, modern office.',
    promptModifier: 'Portrait of the same person in their work environment, identity kept exact, blending professionalism with personality. Composition and pose: Three-quarter body portrait, subject standing or sitting in a modern workspace or studio. Camera at eye level, subject slightly angled, leaning casually on a desk, chair, or railing. Engaged expression, light smile, body language open and confident. Lighting and environment: Mixed lighting: soft key light on subject plus ambient light from screens or windows. Background elements: desk, laptop, shelves, tools, or creative objects, all softly blurred but recognizable. Colour grading slightly warm with good contrast; keep environment tidy and modern. Technical: 35 mm lens at f/2.0 for a sense of place with background separation. High resolution, crisp details in clothing and hair, shallow depth of field. Goal: Shows who the person is and where they work, ideal for portfolio, “About” pages, and personal branding sites.'
  },
  {
    id: HeadshotStyle.PHOTOBOOTH,
    label: 'Photo Booth Grid',
    description: '2x2 grid, playful, social media ready.',
    promptModifier: 'Series of four portraits of the same person laid out in a 2x2 photo-booth grid, identity preserved exactly. Composition and poses: Each frame is a waist-up portrait against a simple warm backdrop. Frame 1: relaxed, neutral pose, gentle smile. Frame 2: playful pose (peace sign, hand near face, or subtle gesture) with brighter smile. Frame 3: thoughtful pose with hand under chin, more serious expression. Frame 4: big natural smile or laughing expression, light in the eyes. Lighting and style: Even, soft studio light from the front, minimal shadows, warm colour temperature. Background: solid light beige or cream, slightly textured, giving a cozy feel. Consistent styling and outfit across all four images. Technical: 50 mm lens at f/2.8, consistent framing and exposure across all frames. Slight film-like grain, subtle vignette, warm colour grading. Goal: A cohesive, fun yet polished set of portraits suitable for a portfolio section, social media, or personal branding page.'
  }
];

export const MAX_FILE_SIZE_MB = 5;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];