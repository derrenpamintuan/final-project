import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../components/AppContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import './RestaurantDetails.css';

export default function RestaurantDetails() {
  const { restaurantId } = useParams();
  const { restaurants } = useContext(AppContext);
  const restaurantArr = restaurants.filter(
    (restaurant) => restaurant.id === restaurantId
  );
  const restaurant = restaurantArr[0];
  console.log(restaurant);

  if (!restaurant) {
    return <NotFoundPage />;
  }

  function displayPrice(price) {
    if (price === undefined) return '$';
    return price;
  }

  function metersToMiles(meters) {
    const miles = meters * 0.00062137;
    return Math.round(miles * 10) / 10;
  }

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

  function displayCategories(categories) {
    return categories.map((category) => category.title + '\n');
  }

  function displayAddress(address) {
    return address.join(' ');
  }

  return (
    <div className="details-background">
      <div className="details-container">
        <img
          className="details-picture"
          src={restaurant.image_url}
          alt="Restaurant, Business, Food"></img>
        <p className="save-to-list">
          Save To List <FaRegHeart className="empty-heart" />
        </p>
        <div className="details-text-container">
          <h2 className="details-title">{restaurant.name}</h2>
          <div className="ratings-container">
            {displayRatings(restaurant.rating)}
            <p className="restaurant-reviews">
              {restaurant.review_count} reviews
            </p>
          </div>
          <p className="details">
            {metersToMiles(restaurant.distance)} miles away
          </p>
          <div className="restaurant-extra-details">
            <p className="details">
              {restaurant.location.city} | {displayPrice(restaurant.price)}
            </p>
          </div>
          <div className="info-container">
            <div className="categories">
              <p className="categories-title">Categories:</p>
              <p className="categories-info">
                {displayCategories(restaurant.categories)}
              </p>
            </div>
            <div className="address">
              <p className="address-title">Address:</p>
              <p className="address-info">
                {displayAddress(restaurant.location.display_address)}
              </p>
            </div>
            <div className="phone">
              <p className="phone-title">Phone:</p>
              <p className="phone-info">{restaurant.display_phone}</p>
            </div>
            <div className="url">
              <p className="url-title">More Information:</p>
              <Link to={restaurant.url}>
                <p className="url-info">Yelp page</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
