export const PUTER_WORKER_URL = import.meta.env.VITE_PUTER_WORKER_URL || "";

// Storage Paths
export const STORAGE_PATHS = {
    ROOT: "roomify",
    SOURCES: "roomify/sources",
    RENDERS: "roomify/renders",
} as const;

// Timing Constants (in milliseconds)
export const SHARE_STATUS_RESET_DELAY_MS = 1500;
export const PROGRESS_INCREMENT = 15;
export const REDIRECT_DELAY_MS = 600;
export const PROGRESS_INTERVAL_MS = 100;
export const PROGRESS_STEP = 5;

// UI Constants
export const GRID_OVERLAY_SIZE = "60px 60px";
export const GRID_COLOR = "#3B82F6";

// HTTP Status Codes
export const UNAUTHORIZED_STATUSES = [401, 403];

// Image Dimensions
export const IMAGE_RENDER_DIMENSION = 1024;

export const ROOMIFY_RENDER_PROMPT = `
TASK: Convert the input 2D floor plan into a **photorealistic, top‑down 3D architectural render**.

STRICT REQUIREMENTS (do not violate):
1) **REMOVE ALL TEXT**: Do not render any letters, numbers, labels, dimensions, or annotations. Floors must be continuous where text used to be.
2) **GEOMETRY MUST MATCH**: Walls, rooms, doors, and windows must follow the exact lines and positions in the plan. Do not shift or resize.
3) **TOP‑DOWN ONLY**: Orthographic top‑down view. No perspective tilt.
4) **CLEAN, REALISTIC OUTPUT**: Crisp edges, balanced lighting, and realistic materials. No sketch/hand‑drawn look.
5) **NO EXTRA CONTENT**: Do not add rooms, furniture, or objects that are not clearly indicated by the plan.

STRUCTURE & DETAILS:
- **Walls**: Extrude precisely from the plan lines. Consistent wall height and thickness.
- **Doors**: Convert door swing arcs into open doors, aligned to the plan.
- **Windows**: Convert thin perimeter lines into realistic glass windows.

FURNITURE & ROOM MAPPING (only where icons/fixtures are clearly shown):
- Bed icon → realistic bed with duvet and pillows.
- Sofa icon → modern sectional or sofa.
- Dining table icon → table with chairs.
- Kitchen icon → counters with sink and stove.
- Bathroom icon → toilet, sink, and tub/shower.
- Office/study icon → desk, chair, and minimal shelving.
- Porch/patio/balcony icon → outdoor seating or simple furniture (keep minimal).
- Utility/laundry icon → washer/dryer and minimal cabinetry.

STYLE & LIGHTING:
- Lighting: bright, neutral daylight. High clarity and balanced contrast.
- Materials: realistic wood/tile floors, clean walls, subtle shadows.
- Finish: professional architectural visualization; no text, no watermarks, no logos.
`.trim();

export const ROOMIFY_3D_TILTED_RENDER_PROMPT = `
TASK:
Convert the uploaded 2D floor plan into a **high-quality, photorealistic 3D isometric / angled architectural render** similar to modern real estate visualizations.

VIEW & CAMERA:
- Use a **slightly tilted top-down isometric perspective (30–45° angle)**.
- The camera should feel like a **cutaway dollhouse view** (no roof).
- Maintain full visibility of all rooms with a natural spatial feel.
- Avoid extreme perspective distortion — keep proportions accurate.

STRICT REQUIREMENTS:
1) **REMOVE ALL TEXT & MARKINGS**
   - Remove all labels, dimensions, annotations, symbols, and numbers.
   - Replace text areas with clean, continuous flooring.

2) **EXACT FLOOR PLAN MATCH**
   - Walls, doors, windows, and layout must match the 2D plan EXACTLY.
   - Do not modify proportions, positions, or room sizes.

3) **STRUCTURAL CONVERSION**
   - Extrude walls to realistic height with consistent thickness.
   - Add clean wall edges and subtle beveling for realism.
   - Doors: convert arcs into slightly open realistic doors.
   - Windows: convert plan lines into glass windows with frames.

4) **REALISTIC INTERIOR GENERATION (SMART FURNISHING)**
   - Intelligently detect room types based on layout and fixtures:
     - Bedroom → bed, side tables, wardrobe
     - Living room → sofa, coffee table, TV unit
     - Kitchen → cabinets, stove, sink
     - Dining → dining table with chairs
     - Bathroom → toilet, sink, shower/tub
     - Balcony/terrace → minimal outdoor seating
   - Keep furniture **modern, minimal, and proportional**.
   - Do NOT overcrowd rooms.

5) **MATERIALS & TEXTURES**
   - Floors: realistic wood, tile, or marble depending on room type
   - Walls: smooth painted surfaces (light neutral tones)
   - Kitchen/Bath: tiles and subtle material variation
   - Furniture: modern, clean, slightly stylized realism

6) **LIGHTING & RENDER QUALITY**
   - Use **soft natural daylight illumination**
   - Add subtle global illumination and soft shadows
   - Ensure even brightness across all rooms
   - No harsh contrast or dramatic lighting

7) **BACKGROUND & PRESENTATION**
   - Place the 3D floor model on a **clean neutral background (light gray/white)**
   - Add soft shadow under the structure for depth
   - Ensure the model looks like a **floating architectural showcase**

8) **VISUAL STYLE**
   - Style: **real estate marketing / architectural visualization**
   - Clean, sharp, high-resolution output
   - Slightly stylized but grounded in realism
   - No cartoonish, sketch, or low-poly look

9) **PROHIBITED**
   - No text, labels, watermarks, or logos
   - No distortion of layout
   - No unrealistic furniture scaling
   - No clutter or excessive decoration

OUTPUT:
- A polished, premium-quality **3D tilted floor plan render**
- Suitable for product demos, real estate listings, or SaaS UI display
`.trim();