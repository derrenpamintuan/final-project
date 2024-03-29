import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AppContext from '../components/AppContext';
import './AuthPage.css';

export default function AuthPage({ action }) {
  const navigate = useNavigate();
  const { user, handleSignIn } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const welcomeHeader = action === 'sign-in' ? 'Welcome' : 'Create an Account';
  return (
    <div className="form-page">
      <header className="form-title">
        <h1>{welcomeHeader}</h1>
      </header>
      <div className="form-container">
        <AuthForm key={action} action={action} onSignIn={handleSignIn} />
      </div>
    </div>
  );
}
