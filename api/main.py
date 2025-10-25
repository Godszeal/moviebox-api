"""
MovieBox API - FastAPI Backend
Serverless API for movie and TV series discovery
Creator: God's Zeal
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Optional, List, Dict, Any
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from moviebox_api import Session
from moviebox_api.core import Search, MovieDetails, TVSeriesDetails, Homepage, Trending, PopularSearch
from moviebox_api.constants import SubjectType
from moviebox_api.models import SearchResultsItem

app = FastAPI(
    title="MovieBox API",
    description="Unofficial API for moviebox.ph - Search, discover, and access movies & TV series",
    version="1.0.0",
    creator="God's Zeal"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def add_creator(data: Any) -> Dict[str, Any]:
    """Add creator field to response"""
    if isinstance(data, dict):
        return {"creator": "God's Zeal", **data}
    else:
        return {"creator": "God's Zeal", "data": data}


@app.get("/")
async def root():
    """API root endpoint"""
    return add_creator({
        "message": "MovieBox API is running",
        "docs": "/docs",
        "api_explorer": "/explorer"
    })


@app.get("/api/search")
async def search_content(
    query: str = Query(..., description="Search query"),
    type: str = Query("all", description="Content type: all, movie, series"),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(24, ge=1, le=100, description="Results per page")
):
    """Search for movies, TV series, or all content"""
    try:
        session = Session()
        
        subject_type_map = {
            "all": SubjectType.ALL,
            "movie": SubjectType.MOVIES,
            "series": SubjectType.TV_SERIES,
            "tv": SubjectType.TV_SERIES
        }
        
        subject_type = subject_type_map.get(type.lower(), SubjectType.ALL)
        
        search = Search(
            session=session,
            query=query,
            subject_type=subject_type,
            page=page,
            per_page=per_page
        )
        
        results = await search.get_content_model()
        
        return add_creator({
            "query": query,
            "type": type,
            "page": page,
            "per_page": per_page,
            "total": len(results.items),
            "has_more": results.pager.hasMore if hasattr(results.pager, 'hasMore') else False,
            "results": [item.model_dump() for item in results.items]
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/trending")
async def get_trending(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(24, ge=1, le=100, description="Results per page")
):
    """Get trending movies and TV series"""
    try:
        session = Session()
        trending = Trending(session=session, page=page, per_page=per_page)
        results = await trending.get_content_model()
        
        return add_creator({
            "page": page,
            "per_page": per_page,
            "total": len(results.items),
            "has_more": results.pager.hasMore if hasattr(results.pager, 'hasMore') else False,
            "results": [item.model_dump() for item in results.items]
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/homepage")
async def get_homepage():
    """Get homepage content"""
    try:
        session = Session()
        homepage = Homepage(session=session)
        content = await homepage.get_content_model()
        
        return add_creator({
            "contents": [item.model_dump() for item in content.contents],
            "categories": [cat.model_dump() for cat in content.operatingList]
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/popular-searches")
async def get_popular_searches():
    """Get popular search terms"""
    try:
        session = Session()
        popular = PopularSearch(session=session)
        content = await popular.get_content_model()
        
        return add_creator({
            "popular_searches": [search.model_dump() for search in content.searches]
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/movie/{subject_id}")
async def get_movie_details(subject_id: str):
    """Get detailed information about a movie"""
    try:
        session = Session()
        
        search = Search(session=session, query=subject_id, subject_type=SubjectType.MOVIES, per_page=1)
        results = await search.get_content_model()
        
        if not results.items:
            raise HTTPException(status_code=404, detail="Movie not found")
        
        movie_item = results.items[0]
        movie_details = MovieDetails(movie_item, session)
        details = await movie_details.get_json_extractor_model()
        
        return add_creator({
            "details": details.model_dump() if details else None,
            "downloadable_files": None
        })
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/series/{subject_id}")
async def get_series_details(subject_id: str):
    """Get detailed information about a TV series"""
    try:
        session = Session()
        
        search = Search(session=session, query=subject_id, subject_type=SubjectType.TV_SERIES, per_page=1)
        results = await search.get_content_model()
        
        if not results.items:
            raise HTTPException(status_code=404, detail="TV series not found")
        
        series_item = results.items[0]
        series_details = TVSeriesDetails(series_item, session)
        details = await series_details.get_json_extractor_model()
        
        return add_creator({
            "details": details.model_dump() if details else None,
            "seasons": None
        })
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content=add_creator({
            "error": str(exc),
            "message": "An error occurred processing your request"
        })
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
