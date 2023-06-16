import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppContext from './components/AppContext';
import NavBar from './components/NavBar';
import Auth from './pages/AuthPage';
import Home from './pages/HomePage';
import NotFound from './pages/NotFoundPage';
import Results from './pages/ResultsPage';
import { useNavigate } from 'react-router-dom';

const tokenKey = 'react-context-jwt';

export default function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem(tokenKey);

    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
    navigate('/sign-in');
  }

  const contextValue = {
    user,
    token,
    restaurants,
    handleSignIn,
    handleSignOut,
    setRestaurants,
  };
  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<Auth action="sign-in" />} />
          <Route path="sign-up" element={<Auth action="sign-up" />} />
          <Route path="results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}
