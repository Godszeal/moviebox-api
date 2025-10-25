const API_BASE_URL = window.location.origin.includes('localhost')
  ? 'http://localhost:8000'
  : `${window.location.origin}`;

class ApiService {
  async request(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    return response.json()
  }

  async getHomepage() {
    return this.request('/api/homepage')
  }

  async getTrending(page = 1, perPage = 24) {
    return this.request(`/api/trending?page=${page}&per_page=${perPage}`)
  }

  async search(query, type = 'all', page = 1, perPage = 24) {
    const params = new URLSearchParams({
      query,
      type,
      page: page.toString(),
      per_page: perPage.toString()
    })
    return this.request(`/api/search?${params}`)
  }

  async getMovieDetails(subjectId) {
    return this.request(`/api/movie/${subjectId}`)
  }

  async getSeriesDetails(subjectId) {
    return this.request(`/api/series/${subjectId}`)
  }

  async getPopularSearches() {
    return this.request('/api/popular-searches')
  }
}

export const apiService = new ApiService()
