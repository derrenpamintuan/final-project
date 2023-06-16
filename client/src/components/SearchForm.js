import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from './AppContext';

//   async function fetchData() {
//   try {
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: process.env.REACT_APP_FOOD_API_KEY
//       }
//     };
//     const response = await fetch('https://api.yelp.com/v3/businesses/search?location=90745&term=thai%20food&sort_by=best_match&limit=20', options);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);

//   } catch (err) {
//     console.error('Error:', err);
//   }
// }
// fetchData();

export default function Search() {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState();
  // const [users, setUsers] = useState([]);
  // const [user, setUser] = useState();

  const { setRestaurants } = useContext(AppContext);
  useEffect(() => {
    async function fetchData() {
      const targetUrl = encodeURIComponent(
        'https://api.yelp.com/v3/businesses/search?location=90745&term=thai%20food&sort_by=best_match&limit=20'
      );
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
      const data = await response.json();
      setRestaurants(data.businesses);
    }
    fetchData();
  }, [setRestaurants]);

  // useEffect(() => {
  //   try {
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: process.env.REACT_APP_FOOD_API_KEY
  //       }
  //     };

  //     async function fetchData() {
  //       const response = await fetch('https://api.yelp.com/v3/businesses/search?location=90745&term=thai%20food&sort_by=best_match&limit=20', options);
  //       if (!response.ok) {
  //         throw new Error('Error: fetch response did not return a 200 code');
  //       }
  //       const data = await response.json();
  //       setUsers(data);
  //       setIsLoading(false);
  //     }
  //     fetchData();

  //     } catch (err) {
  //     console.error('Error:', err);
  //     setIsLoading(false);
  //     setError(err);
  //   }
  // }, [])

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  // if (error) {
  //   console.error('Fetch error:', error);
  //   return <p>Error! {error.message}</p>;
  // }

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
        <button
          type="submit"
          className="search-button"
          onClick={() => navigate('/results')}>
          Search
        </button>
      </div>
    </form>
  );
}
