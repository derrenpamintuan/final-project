import { useContext } from 'react';
import AppContext from './AppContext';
import { BsStarFill, BsStar } from 'react-icons/bs';

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
    if (price === undefined) {
      return '$';
    } else {
      return price;
    }
  }

  function metersToMiles(meters) {
    const miles = meters * 0.00062137;
    return Math.round(miles * 10) / 10;
  }

  let resultNumber = 0;

  function countResults() {
    resultNumber++;
    return resultNumber;
  }

  return (
    <>
      <ul className="search-list">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} className="result-container">
            <img src={restaurant.image_url} alt="food, restaurant, or menu" />
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
                  {restaurant.location.city} | {displayPrice(restaurant.price)}{' '}
                  | {metersToMiles(restaurant.distance)} mi
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
