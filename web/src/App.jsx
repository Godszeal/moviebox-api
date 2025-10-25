import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { MovieCard } from './components/MovieCard'
import { SearchBar } from './components/SearchBar'
import { MovieModal } from './components/MovieModal'
import { apiService } from './services/api'
import './styles/App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentView, setCurrentView] = useState('home')

  useEffect(() => {
    loadHomepage()
  }, [])

  const loadHomepage = async () => {
    setLoading(true)
    try {
      const data = await apiService.getHomepage()
      setMovies(data.contents || [])
    } catch (error) {
      console.error('Error loading homepage:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadTrending = async () => {
    setLoading(true)
    try {
      const data = await apiService.getTrending()
      setMovies(data.results || [])
      setCurrentView('trending')
    } catch (error) {
      console.error('Error loading trending:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query) => {
    if (!query.trim()) {
      loadHomepage()
      return
    }
    
    setLoading(true)
    setSearchQuery(query)
    setCurrentView('search')
    
    try {
      const data = await apiService.search(query)
      setMovies(data.results || [])
    } catch (error) {
      console.error('Error searching:', error)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie)
  }

  const handleNavigate = (view) => {
    setCurrentView(view)
    if (view === 'home') {
      loadHomepage()
    } else if (view === 'trending') {
      loadTrending()
    } else if (view === 'api-docs') {
      window.location.href = '/explorer.html'
    }
  }

  return (
    <div className="app">
      <Header onNavigate={handleNavigate} />
      
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-content">
            <h1>Discover Unlimited Movies & TV Series</h1>
            <p>Search, stream, and download your favorite content in high quality</p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>
              {currentView === 'search' && searchQuery
                ? `Search Results for "${searchQuery}"`
                : currentView === 'trending'
                ? 'Trending Now'
                : 'Featured Content'}
            </h2>
          </div>

          {loading ? (
            <div className="loading">
              <div className="loader"></div>
              <p>Loading...</p>
            </div>
          ) : movies.length === 0 ? (
            <div className="no-results">
              <p>No results found</p>
            </div>
          ) : (
            <div className="movie-grid">
              {movies.map((movie, index) => (
                <MovieCard
                  key={movie.subjectId || index}
                  movie={movie}
                  onClick={() => handleMovieClick(movie)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <footer className="footer">
        <p>MovieBox API - Created by God's Zeal</p>
        <p>Unofficial wrapper for moviebox.ph</p>
      </footer>
    </div>
  )
}

export default App
