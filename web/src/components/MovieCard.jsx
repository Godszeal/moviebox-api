export function MovieCard({ movie, onClick }) {
  const imageUrl = movie.cover?.url || movie.image?.url || 'https://via.placeholder.com/300x450?text=No+Image'
  const title = movie.title || 'Unknown Title'
  const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : ''
  const rating = movie.imdbRatingValue || 'N/A'
  const type = movie.subjectType === 1 ? '🎬 Movie' : '📺 Series'

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster">
        <img src={imageUrl} alt={title} loading="lazy" />
        <div className="movie-overlay">
          <span className="play-icon">▶</span>
        </div>
      </div>
      <div className="movie-info">
        <h3>{title}</h3>
        <div className="movie-meta">
          <span className="type-badge">{type}</span>
          {year && <span className="year">{year}</span>}
          <span className="rating">⭐ {rating}</span>
        </div>
      </div>
    </div>
  )
}
