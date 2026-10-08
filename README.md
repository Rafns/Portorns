# Rafael Nandana S. - Personal Portfolio

A luxury modernist, high-performance personal portfolio for **Rafael Nandana S.** - Undergraduate Computer Science student at BINUS University specializing in Intelligent Systems, Artificial Intelligence, Machine Learning, and Full-Stack Software Engineering.

Live Repository: [https://github.com/Rafns/Portorns](https://github.com/Rafns/Portorns)

---

## Key Highlights & Features

- **Screen 1: Cinematic Triptych Hero**
  - 3-column architectural triptych canvas with continuous panoramic imagery.
  - Procedural atmospheric canvas simulating moving mountain mist and topographic contour waves.
  - 3D mouse parallax and smooth scroll damping.
  - Direct quick connect actions (Resume PDF, GitHub, LinkedIn, Email).

- **Screen 2: Holographic About & Academic Profile**
  - Interactive 3D tilt portrait card with real-time glare reflection physics.
  - Academic profile overview (GPA 3.89 / 4.00, Intelligent Systems specialization).

- **Screen 3: Zig-Zag Career Timeline**
  - Dynamic self-drawing SVG timeline dynamically calculating coordinates between milestone cards.
  - Quantified impact highlights and actionable skill tags for BINUS University and BNCC (Bina Nusantara Computer Club).
  - Detailed interactive modal popup for in-depth milestone review.

- **Screen 4: Featured Projects Showcase**
  - Horizontal drag, swipe, and arrow-navigated project carousel.
  - In-depth project modals detailing problem statements, architectural contributions, key takeaways, and live repositories.
  - Integrated synthesizer audio tone preview for each project.

- **Screen 5: Tech Signal Waves & Engineering Mindset**
  - Real-time animated sinusoidal wave system mapping 26 production technologies across 4 tiers (Core Languages, Frontend, AI/ML, and Backend, DevOps & LLMs).
  - Explicit mastery level badging (`Core Stack`, `Supporting Tool`, `LLM & AI Tooling`).
  - Interactive flingable trait card deck showcasing core engineering and collaboration principles.

- **Screen 6: Verified Certifications & Accreditations**
  - Verified credential records from Microsoft (Azure AI-900), HackerRank (SQL Advanced), Dicoding Indonesia, and UniAthena.
  - Direct credential verification links.

- **Screen 7 & Footer: Contact & Quick Inquiry**
  - Interactive one-click email clipboard copy with visual feedback.
  - Resume download action and direct professional social channels.

---

## Tech Stack

### Core Frameworks & Runtime
- **React 19** - Component architecture and state management
- **TypeScript 5.7** - End-to-end static type safety
- **Vite 6** - Fast HMR development and optimized production bundling

### Styling & Design System
- **Tailwind CSS v4** - Utility-first styling with customized luxury dark palette (`#0A0A0A`, `#F2EAD3`)
- **Lucide React** - Clean vector iconography

### Motion & Physics
- **Motion (Framer Motion 12)** - Gesture drag physics, spring animations, and layout transitions
- **HTML5 Canvas 2D** - Procedural volumetric fog and undulating contour lines
- **Web Audio API** - Interactive synthesized audio previews and ambient sound generation

---

## Project Structure

```
├── public/
│   └── assets/              # Static images, project screenshots, and media
├── src/
│   ├── components/          # Reusable UI sections & modals
│   │   ├── AboutSection.tsx
│   │   ├── AudioDronePlayer.tsx
│   │   ├── CareerSection.tsx
│   │   ├── CertificatesSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── PageDividerMarquee.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── TechIcons.tsx
│   │   ├── TechSignalSection.tsx
│   │   └── TraitCardsDeck.tsx
│   ├── data/                # Structured data models
│   │   ├── certificateData.ts
│   │   ├── journeyData.ts
│   │   ├── portfolioData.ts
│   │   ├── techSignalData.ts
│   │   └── techStackData.ts
│   ├── App.tsx              # Main application root layout
│   ├── types.ts             # TypeScript interfaces
│   └── main.tsx             # Application entrypoint
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or later recommended)
- npm or pnpm / yarn

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Rafns/Portorns.git
   cd Portorns
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## Author

**Rafael Nandana S.**
- Email: [nandana.sambodo@gmail.com](mailto:nandana.sambodo@gmail.com)
- GitHub: [@Rafns](https://github.com/Rafns)
- LinkedIn: [Rafael Nandana S.](https://www.linkedin.com/in/rafael-nandana-s-814257314)
