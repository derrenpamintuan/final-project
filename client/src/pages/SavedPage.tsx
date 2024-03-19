import { useEffect, useState, useContext } from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';
import './SavedPage.css';

export default function SavedPage() {
  const [savedRestaurants, setSavedRestaurants] = useState([]);
  const { user } = useContext(AppContext);
  const userId = user ? user.userId : null;

  useEffect(() => {
    if (userId) {
      async function getSaved() {
        const result = await fetch(`/api/saved/${userId}`);
        const data = await result.json();
        setSavedRestaurants(data);
      }
      getSaved();
    }
  }, [userId]);

  function displayRatings(rating) {
    switch (Math.round(rating)) {
      case 1:
        return (
          <>
            <BsStarFill className="ratings" />
            <BsStar className="ratings-empty" />
            <BsStar className="ratings-empty" />
            <BsStar className="ratings-empty" />
            <BsStar className="ratings-empty" />
          </>
        );
      case 2:
        return (
          <>
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStar className="ratings-empty" />
            <BsStar className="ratings-empty" />
            <BsStar className="ratings-empty" />
          </>
        );
      case 3:
        return (
          <>
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStar className="ratings-empty" />
            <BsStar className="ratings-empty" />
          </>
        );
      case 4:
        return (
          <>
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStar className="ratings-empty" />
          </>
        );
      case 5:
        return (
          <>
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
          </>
        );
      default:
        return (
          <>
            <BsStar className="ratings-empty" />
            <BsStar className="ratings-empty" />
            <BsStar className="ratings-empty" />
            <BsStar className="ratings-empty" />
            <BsStar className="ratings-empty" />
          </>
        );
    }
  }

  function displayPrice(price) {
    if (price === undefined) return '$';
    return price;
  }

  function returnEmpty(restaurants) {
    if (restaurants.length === 0) {
      return (
        <div className="no-results-container">
          <p className="no-results">No results</p>
          <Link className="return-home" to="/">
            Return Home
          </Link>
        </div>
      );
    }
  }

  return (
    <>
      <div className="saved-results">
        <header className="results-title">
          <h1 className="title-container">Saved</h1>
        </header>
        <div className="break"></div>
        <div className="results-container">
          {returnEmpty(savedRestaurants)}
          <ul className="search-list">
            {savedRestaurants.map((restaurant) => (
              <Link
                key={restaurant.yelpId}
                className="restaurant-link"
                to={`/saved/details/${restaurant.yelpId}`}>
                <li className="result-container">
                  <img
                    className="restaurant-image"
                    src={restaurant.photoUrl}
                    alt="Restaurant, Business, Food"
                  />
                  <div className="restaurant-details">
                    <p className="restaurant-name">{restaurant.title}</p>
                    <div className="ratings-container">
                      {displayRatings(restaurant.rating)}
                      <p className="restaurant-reviews">
                        {restaurant.reviews} reviews
                      </p>
                    </div>
                    <div className="restaurant-extra-details">
                      <p className="details">
                        City: {restaurant.city} <br />
                        Price: {displayPrice(restaurant.price)}
                      </p>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
