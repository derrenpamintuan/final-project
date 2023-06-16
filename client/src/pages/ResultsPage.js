import RestaurantList from '../components/RestaurantList';
import './ResultsPage.css';

export default function Results() {
  return (
    <div className="search-results">
      <header className="results-title">
        <h1>Results</h1>
      </header>
      <div className="results-container">
        <RestaurantList />
      </div>
    </div>
  );
}
