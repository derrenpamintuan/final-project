import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AppContext from '../../components/AppContext';

export default function SavedDetails() {
  const [savedRestaurant, setSavedRestaurant] = useState({});
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

  return <p>{savedRestaurant.title}</p>;
}
