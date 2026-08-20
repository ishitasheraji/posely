# PoseMate — AI Pose & Photography Assistant 📸✨

> **“Your AI Photographer — Never Ask ‘How Should We Pose?’ Again.”**

PoseMate is a production-quality web application that acts like a personal photography director. It generates complete, actionable photo directives — including visual group formation diagrams, posture & hand instructions for every person, facial expressions, lighting tips, and camera angle/distance setups.

---

## 🌟 Key Features

1. **AI Pose Generator (`/generate`)**: Multi-step configuration (People, Location/Background, Style, Outfit, Time, Camera).
2. **Interactive Group Formation Diagrams**: SVG visualizations of where Person 1, Person 2, Person 3... should stand or sit relative to the camera lens.
3. **Person-by-Person Guidance**: Posture, hand placement, leg footing, eye direction, and expression instructions for every participant.
4. **Camera Setup Director**: 3D-like camera placement (angle, height, distance, lens selection, orientation).
5. **Background & Lighting Advice**: Spot recommendations, depth-of-field guidance, and ambient lighting tips.
6. **Upload Custom Background (`/generate`)**: Upload an environment photo to receive custom-tailored poses.
7. **Fix My Pose (`/fix-pose`)**: Upload a draft photo to detect occluded friends, stiff postures, or bad composition with AI feedback.
8. **Surprise Me**: 1-click randomized studio setup for quick inspiration.
9. **Full 10-Pose Photo Session**: Generate 10 diverse pose variations for complete shoot planning.
10. **Pose Library & Search (`/poses`)**: Browse & filter curated poses by category, style, and group size.
11. **Saved Poses & Collections (`/saved`)**: Bookmark favorite poses and organize into custom folders.
12. **Modular AI Service Architecture**: Seamlessly switch between local generative logic and OpenAI/Gemini APIs in `services/aiPoseService.ts`.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v3, Lucide Icons, Vite
- **Backend**: Express, Node.js, CORS, TSX runner
- **Database Architecture**: Clean SQL schema & PostgreSQL readiness

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Application (Frontend + Dev Server)
```bash
# Terminal 1: Run Vite Frontend
npm run dev

# Terminal 2: Run Express API Server (Optional)
npm run server
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure
```text
posely/
├── server/
│   └── index.ts               # Express API Endpoints
├── src/
│   ├── components/            # Reusable UI Components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── FormationDiagram.tsx
│   │   ├── CameraSetupCard.tsx
│   │   ├── PoseResultCard.tsx
│   │   └── AuthModal.tsx
│   ├── pages/                 # Full Page Views
│   │   ├── GeneratorPage.tsx  # Multi-step AI Studio
│   │   ├── FixPosePage.tsx    # Vision Pose Corrector
│   │   ├── PoseLibraryPage.tsx# Search & Filter Catalog
│   │   └── SavedPage.tsx      # Saved Poses & Collections
│   ├── services/
│   │   └── aiPoseService.ts   # Modular AI Engine Layer
│   ├── types/
│   │   └── pose.ts            # TypeScript Models
│   ├── App.tsx                # App Routing & State
│   └── index.css              # Glassmorphism & Theme
└── package.json
```
