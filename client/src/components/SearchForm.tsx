import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from './AppContext';

export default function Search() {
  const navigate = useNavigate();
  const [error, setError] = useState<unknown>();

  const { setRestaurants, setSearchTerm, setLocation } = useContext(AppContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { location, search } = Object.fromEntries(formData.entries());
    setLocation(location);
    setSearchTerm(search);

    async function fetchData() {
      const targetUrl = encodeURIComponent(
        `https://api.yelp.com/v3/businesses/search?location=${location}&term=${search}&sort_by=best_match&limit=20`
      );
      try {
        const response = await fetch(
          'https://lfz-cors.herokuapp.com/?url=' + targetUrl,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer _Ab76MPJampI6n-zleTBefzDO16r0Nl5K3R7Xz4FQMxbcZsyNi9yN5YMGGDGyA91jqTQzzjKj0dcPBmn-UgfGjk3ortcnbk_8wrOVTGbqHCUmmRDSY5n7fHUOFx6ZHYx',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Error: Invalid location');
        }
        const data = await response.json();
        setRestaurants(data.businesses);
        navigate('/results');
      } catch (err) {
        setError(err);
      }
    }
    fetchData();
  }

  return (
    <form onSubmit={handleSubmit}>
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
            autoComplete="off"
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
      {!!error && (
        <div className="location-error" style={{ color: 'red' }}>
          Invalid location
        </div>
      )}
    </form>
  );
}
