import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';
import RestaurantList from '../components/RestaurantList';
import './ResultsPage.css';

export default function Results() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (!user) navigate('/sign-in');
  }, [user, navigate]);

  return (
    <div className="search-results">
      <header className="results-title">
        <h1 className="title-container">Results</h1>
      </header>
      <div className="break"></div>
      <div className="results-container">
        <RestaurantList />
      </div>
    </div>
  );
}
