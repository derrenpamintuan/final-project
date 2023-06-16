// import { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AppContext from '../components/AppContext';
import Search from '../components/SearchForm';
import RestaurantList from '../components/RestaurantList';
import './HomePage.css';

export default function Home() {
  // const navigate = useNavigate();
  // const { user } = useContext(AppContext);

  // useEffect(() => {
  //   if (!user) navigate('/sign-in');
  // }, [user, navigate])

  return (
    <div className="search-page">
      <header className="home-title">
        <h1>Get Started</h1>
      </header>
      <div className="search-container">
        <Search />
      </div>
    </div>
  );
}
