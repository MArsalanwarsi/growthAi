# GrowthRadar AI - Full-Stack Competitor & Social Intelligence Platform

GrowthRadar AI is a premium, investor-ready, enterprise-grade B2B SaaS competitor intelligence, social analytics, and growth advisory platform. It Decodes competitor momentum patterns (social channels, ad activity, search footprint, customer reviews) and leverages AI reasoning models to generate high-leverage marketing actions.

---

## Technical Stack & Architecture

### Backend (`/server`)
- **Core Runtime**: Node.js & Express.js
- **Pattern**: Model-View-Controller (MVC) architecture with clean directory separation
- **API Versioning**: `/api/v1` base routes
- **AI Integration**: Custom provider abstraction layer isolating prompts and providers, utilizing the `@google/generative-ai` SDK. Supports a highly realistic fallback responder if `GEMINI_API_KEY` is omitted.
- **Real-Time Signals**: Socket.IO integration for broadcasting competitor ad launches and virality signals.
- **Cache Layer**: Redis-ready wrapper featuring a custom in-memory key-value caching system.
- **Security & Rate Limiting**: Helmet security headers (CSP policies), CORS configuration, global Express IP rate limiting, and endpoint throttles.
- **Logging & Errors**: Centralized winston logging and global `ApiError` standardized catch pipelines.

### Frontend (`/frontend`)
- **Framework**: React 19 & Vite 8
- **Styling**: Tailwind CSS v4 featuring premium oklch tokens, customized slate/charcoal surfaces, tactile buttons, bento layouts, and glassmorphic dashboards.
- **State Management**: Redux Toolkit for unified sessions, dashboard statistics, competitors audits, alerts log, and suggestions.
- **Animations**: GSAP animations mapping kinetic page reveals, bento staggers, and interactive scanning loader pipelines.
- **Analytics Visuals**: Recharts for premium lines, bars, and radar visualizations.
- **API Layer**: Axios client configured with authorization interceptors and response normalizing.

---

## Directory Folder Structure

```text
server/
├── src/
│   ├── config/          # env.js, db.js, redis.js, cors.js
│   ├── controllers/     # MVC REST Controllers
│   ├── models/          # Storage blueprints
│   ├── routes/          # REST Endpoint routers
│   ├── services/        # AI prompts, crawlers, social, socket integrations
│   ├── middlewares/     # rateLimit, security Helmet, validation pipelines
│   ├── utils/           # ApiError, ApiResponse, winston logger
│   ├── sockets/         # websocket connection registrar
│   ├── app.js           # main express application setup
│   └── server.js        # bootstrap server entrypoint
├── .env                 # Port & CORS configurations
└── package.json

frontend/
├── src/
│   ├── api/             # axiosClient, REST resource layers
│   ├── components/      # charts, loaders, layouts, customized UI
│   ├── features/        # auth, onboarding pages
│   ├── hooks/           # custom react and GSAP animation hooks
│   ├── layouts/         # Layout modules
│   ├── pages/           # dashboard, settings, public landing templates
│   ├── redux/           # store, slices for state management
│   ├── router/          # AppRouter, route configuration
│   └── services/        # Websocket socket client listener
├── package.json
└── vite.config.js
```

---

## Quick Start Setup & Launch

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### 1. Start the Backend API Server
Navigate to the server directory, install packages, and boot the watcher:
```bash
cd server
npm install
npm run dev
```
The server will establish database mocks and boot websocket channels at **`http://localhost:5000`**.

> [!NOTE]
> To enable real-time Gemini generation, populate `GEMINI_API_KEY` in `server/.env`. If omitted, the server will trigger premium offline fallback mocks to ensure the platform operates seamlessly.

### 2. Start the React Frontend Developer Client
Navigate to the frontend directory, install packages, and boot the Vite server:
```bash
cd frontend
npm install
npm run dev
```
The browser client will start at **`http://localhost:5173`**.

---

## Verification & Walkthrough Guide

1. **Authentication Flow**: Open the landing page, click **Start free demo**, register a new organization account or click login to access.
2. **Interactive Onboarding Pipeline**: Populate step 1 to 4 with business handles. Step 5 triggers a GSAP-driven visual competitor discovery scanner mapping Meta and Instagram APIs.
3. **Growth Command Center**: Experience full analytics metrics, engagement line charts, and live alerts captured by websockets.
4. **Competitors Deep Dive & Why They Win**: Compare competitors head-to-head in Battle Mode, examine sentiment complaints, and select AI recommendation templates to draft marketing copy instantly.
