export default function Search() {
  return (
    <form>
      <div className="location">
        <label>
          <p className="location-label">Set location</p>
          <input
            required
            autoFocus
            type="text"
            name="location"
            className="form-control"
            placeholder="Los Angeles, CA 90014"
          />
        </label>
      </div>
      <div className="search">
        <label>
          <p className="search-label">Search for</p>
          <input
            required
            type="text"
            name="search"
            className="form-control"
            placeholder="Restaurants..."
          />
        </label>
      </div>
      <div>
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
    </form>
  );
}
