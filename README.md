<div align="center">

# KeenKeeper

Track friendships with intention using a clean, responsive relationship management app.

[![Live Demo](https://img.shields.io/badge/Live-Demo-1f5a49?style=for-the-badge)](https://mahmudunnabifahim29.github.io/B13-A7/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

## Project Overview

KeenKeeper helps users maintain meaningful friendships by highlighting who needs follow-up, logging communication events, and showing interaction insights. The app is designed for mobile, tablet, and desktop users with a consistent UI across screen sizes.

## Live Links

- Netlify Live Site: https://effulgent-souffle-a7f430.netlify.app/
- GitHub Pages Live Site: https://mahmudunnabifahim29.github.io/B13-A7/
- GitHub Repository: https://github.com/mahmudunnabifahim29/B13-A7

## Technologies Used

| Category | Tools |
| --- | --- |
| Frontend | React 18, React Router DOM |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Visualization | Recharts |
| UI Utilities | Lucide React, React Hot Toast |

## 3 Key Features

1. Smart Friend Dashboard  
	Browse friend cards with profile details, tags, status badges, and days-since-contact tracking.

2. Quick Check-In to Timeline  
	Add Call, Text, or Video interactions from the friend details page and instantly create timeline entries with toast feedback.

3. Friendship Analytics and Filtering  
	View interaction distribution in the Stats chart and filter timeline history by interaction type.

## Pages and Routing

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Friend list, summary cards, and entry point |
| `/friend/:friendId` | Friend Details | Profile details, goals, quick check-in actions |
| `/timeline` | Timeline | Chronological interaction history with filters |
| `/stats` | Stats | Pie chart analytics by interaction type |
| `*` | 404 | Fallback page for unknown routes |

## Local Setup

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deployment Note

This app is deployed on GitHub Pages and configured for a repository subpath (`/B13-A7/`) in production.

## Project Structure

```text
src/
  components/
  context/
  pages/
  utils/
public/
  friends.json
assets/
```

## C3 Checklist Coverage

- Project Name: Included (`KeenKeeper`)
- Short Description: Included in Project Overview
- Technologies Used: Included in Technology table
- 3 Key Features: Included in dedicated section