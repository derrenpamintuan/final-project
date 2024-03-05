import { useContext } from 'react';
import AppContext from './AppContext';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function RestaurantList() {
  const { restaurants } = useContext(AppContext);

  function displayRatings(rating) {
    switch (rating) {
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
      case 1.5:
        return (
          <>
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
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
      case 2.5:
        return (
          <>
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
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
      case 3.5:
        return (
          <>
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
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
      case 4.5:
        return (
          <>
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
            <BsStarFill className="ratings" />
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
            <BsStarFill className="ratings" />
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

  function metersToMiles(meters) {
    const miles = meters * 0.00062137;
    return Math.round(miles * 10) / 10;
  }

  let resultNumber = 1;

  function countResults() {
    return resultNumber++;
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
      {returnEmpty(restaurants)}
      <ul className="search-list">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            className="restaurant-link"
            to={`/details/${restaurant.id}`}>
            <li className="result-container">
              <img
                className="restaurant-image"
                src={restaurant.image_url}
                alt="Restaurant, Business, Food"
              />
              <div className="restaurant-details">
                <p className="restaurant-name">
                  {countResults()}. {restaurant.name}
                </p>
                <div className="ratings-container">
                  {displayRatings(restaurant.rating)}
                  <p className="restaurant-reviews">
                    {restaurant.review_count} reviews
                  </p>
                </div>
                <div className="restaurant-extra-details">
                  <p className="details">
                    {restaurant.location.city} |{' '}
                    {displayPrice(restaurant.price)} |{' '}
                    {metersToMiles(restaurant.distance)} mi
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
