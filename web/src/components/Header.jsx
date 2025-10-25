export function Header({ onNavigate }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => onNavigate('home')}>
          <h1>🎬 MovieBox</h1>
        </div>
        <nav className="nav">
          <button onClick={() => onNavigate('home')}>Home</button>
          <button onClick={() => onNavigate('trending')}>Trending</button>
          <button onClick={() => onNavigate('api-docs')}>API Docs</button>
        </nav>
      </div>
    </header>
  )
}
