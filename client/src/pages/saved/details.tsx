import { useParams, Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';
import AppContext from '../../components/AppContext';
import './details.css';

export default function SavedDetails() {
  const [savedRestaurant, setSavedRestaurant] = useState<any>({});
  const { user } = useContext(AppContext);
  const userId = user ? user.userId : null;
  const { restaurantId } = useParams();

  useEffect(() => {
    if (userId) {
      async function getData() {
        const result = await fetch(
          `/api/saved/details/${restaurantId}?userId=${userId}`
        );
        const data = await result.json();
        setSavedRestaurant(data);
      }
      getData();
    }
  }, [restaurantId, userId]);

  function displayPrice(price) {
    if (price === undefined) return '$';
    return price;
  }

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

  return (
    <div className="saved-background">
      <div className="details-container">
        <img
          className="details-picture"
          src={savedRestaurant.photoUrl}
          alt="Restaurant, Business, Food"></img>
        <div className="details-text-container">
          <h2 className="details-title">{savedRestaurant.title}</h2>
          <div className="ratings-container">
            {displayRatings(savedRestaurant.rating)}
            <p className="restaurant-reviews">
              {savedRestaurant.reviews} reviews
            </p>
          </div>
          <div className="restaurant-extra-details">
            <p className="details">
              {savedRestaurant.city} <span className="or">|</span>{' '}
              {displayPrice(savedRestaurant.price)}
            </p>
          </div>
          <div className="info-container">
            <div className="categories">
              <p className="categories-title">Categories:</p>
              <p className="categories-info">{savedRestaurant.categories}</p>
            </div>
            <div className="address">
              <p className="address-title">Address:</p>
              <p className="address-info">{savedRestaurant.address}</p>
            </div>
            <div className="phone">
              <p className="phone-title">Phone:</p>
              <p className="phone-info">{savedRestaurant.phone}</p>
            </div>
            <div className="url">
              <p className="url-title">More Information:</p>
              <Link to={savedRestaurant.yelpUrl} className="url-info">
                Yelp page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
