import { useState, useEffect } from 'react'
import { apiService } from '../services/api'

export function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDetails()
  }, [movie])

  const loadDetails = async () => {
    setLoading(true)
    try {
      let data
      if (movie.subjectType === 1) {
        data = await apiService.getMovieDetails(movie.subjectId)
      } else {
        data = await apiService.getSeriesDetails(movie.subjectId)
      }
      setDetails(data)
    } catch (error) {
      console.error('Error loading details:', error)
    } finally {
      setLoading(false)
    }
  }

  const imageUrl = movie.cover?.url || movie.image?.url || 'https://via.placeholder.com/500x750?text=No+Image'
  const title = movie.title || 'Unknown Title'
  const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : ''
  const rating = movie.imdbRatingValue || 'N/A'
  const description = movie.description || 'No description available.'
  const genres = movie.genre?.join(', ') || 'N/A'
  const duration = movie.duration ? `${Math.floor(movie.duration / 60)} mins` : 'N/A'

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-body">
          <div className="modal-poster">
            <img src={imageUrl} alt={title} />
          </div>
          
          <div className="modal-details">
            <h2>{title} {year && `(${year})`}</h2>
            
            <div className="modal-meta">
              <span className="rating">⭐ {rating}/10</span>
              <span className="duration">🕐 {duration}</span>
              <span className="country">{movie.countryName || 'N/A'}</span>
            </div>
            
            <div className="modal-genres">
              <strong>Genres:</strong> {genres}
            </div>
            
            <div className="modal-description">
              <p>{description}</p>
            </div>

            {movie.trailer && (
              <div className="modal-trailer">
                <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="btn-trailer">
                  ▶ Watch Trailer
                </a>
              </div>
            )}
            
            <div className="modal-actions">
              <button className="btn-primary">
                📥 Download
              </button>
              <button className="btn-secondary">
                📝 Download Subtitles
              </button>
              <button className="btn-secondary">
                🎥 Stream
              </button>
            </div>

            {loading && (
              <div className="modal-loading">
                <p>Loading additional details...</p>
              </div>
            )}

            {details && (
              <div className="modal-extra-info">
                <p className="creator-badge">Created by God's Zeal</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
