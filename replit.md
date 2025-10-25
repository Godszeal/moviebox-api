# MovieBox API - Full Stack Application

## Overview
This is a complete serverless web application that converts the moviebox-api Python CLI into a full-featured movie streaming and discovery platform. The project consists of:

1. **FastAPI Backend** - RESTful API for movie/TV series data
2. **React Frontend** - User-facing movie browsing website  
3. **API Explorer** - Interactive API documentation and testing

**Creator:** God's Zeal

## Recent Changes (October 25, 2025)

### Major Updates
- ✅ Converted Python CLI to FastAPI backend with HTTP endpoints
- ✅ Created React/Vite frontend for movie browsing
- ✅ Built interactive API Explorer for testing endpoints
- ✅ Configured both workflows (Frontend on port 5000, Backend on port 8000)
- ✅ Set up API proxy in Vite for seamless communication
- ✅ Upgraded to Python 3.11 for compatibility

### Architecture
```
moviebox-web/
├── api/                  # FastAPI Backend
│   └── main.py          # API routes and endpoints
├── web/                  # React Frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   └── styles/      # CSS styling
│   ├── index.html       # Main HTML
│   └── explorer.html    # API documentation
├── src/moviebox_api/    # Original Python library
└── vite.config.js       # Vite configuration with proxy
```

## Features Implemented

### API Endpoints
All endpoints include `"creator": "God's Zeal"` in responses:

- `GET /` - API root
- `GET /api/search` - Search movies/TV series
- `GET /api/trending` - Get trending content
- `GET /api/homepage` - Get homepage featured content
- `GET /api/popular-searches` - Get popular search terms
- `GET /api/movie/{subject_id}` - Get movie details
- `GET /api/series/{subject_id}` - Get TV series details

### Frontend Features
- 🎬 Browse and search movies/TV series
- 📺 View movie details, trailers, ratings
- 🔍 Real-time search functionality
- ⭐ Trending content section
- 📝 Download and subtitle options
- 🎨 Modern, responsive design with gradients

### API Explorer
- Interactive endpoint testing
- Live API responses
- Parameter input forms
- Syntax-highlighted JSON responses
- Professional styling

## User Preferences

### Development Workflow
- **Backend Port:** 8000 (API Backend workflow)
- **Frontend Port:** 5000 (Frontend workflow)
- **Proxy:** Vite proxies `/api/*` requests to backend

### Tech Stack
- **Backend:** Python 3.11, FastAPI, Uvicorn
- **Frontend:** React 19, Vite 7
- **Original Library:** moviebox-api (with throttlebuster, httpx, pydantic, bs4)

## Project Configuration

### Python Environment
- Python 3.11.13 (required for throttlebuster StrEnum support)
- Virtual environment at `.venv/`
- Dependencies managed via pyproject.toml

### Node.js Environment  
- Node.js 20
- Package manager: npm
- Build tool: Vite 7

### Workflows
1. **Frontend** - Runs `npm run dev` on port 5000 (webview)
2. **API Backend** - Runs `.venv/bin/python -m uvicorn api.main:app --host 0.0.0.0 --port 8000` (console)

## Deployment
Ready for serverless deployment on Replit. Both workflows are configured to:
- Frontend serves on port 5000 (required for Replit webview)
- Backend runs on port 8000
- API requests are proxied through Vite for seamless integration

## Next Steps / Future Enhancements
- Add actual download functionality endpoints
- Implement streaming video player
- Add user authentication
- Create favorites/watchlist features
- Add pagination for search results
- Implement caching for better performance

## Notes
- The application uses the moviebox.ph unofficial API
- All video content is sourced from external providers
- Respects copyright laws and fair use
