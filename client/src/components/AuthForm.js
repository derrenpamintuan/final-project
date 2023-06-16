import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpOrIn } from '../lib';

export default function AuthForm({ action, onSignIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, password } = Object.fromEntries(formData.entries());
    console.log(formData);
    console.log(username, password);
    try {
      const result = await signUpOrIn(action, username, password);
      if (action === 'sign-up') {
        navigate('/sign-in');
      } else if (result.user && result.token) {
        onSignIn(result);
      }
    } catch (err) {
      setError(err);
    }
  }

  const alternateActionTo = action === 'sign-up' ? '/sign-in' : '/sign-up';
  const alternateActionText =
    action === 'sign-up' ? 'Sign in instead' : 'Create a account';
  const submitButtonText = action === 'sign-up' ? 'Register' : 'Continue';

  return (
    <form onSubmit={handleSubmit}>
      <div className="email">
        <label>
          <p className="email-label">Email</p>
          <input
            required
            autoFocus
            type="text"
            name="username"
            className="form-control"
          />
        </label>
      </div>
      <div className="password">
        <label>
          <p className="password-label">Password</p>
          <input
            required
            type="password"
            name="password"
            className="form-control"
          />
        </label>
      </div>
      <div>
        <button type="submit" className="submit-button">
          {submitButtonText}
        </button>
      </div>
      <div className="links">
        <small>
          <Link className="link-switch" to={alternateActionTo}>
            {alternateActionText}
          </Link>
        </small>
        <p className="or">OR</p>
        <small>
          <Link className="link-switch">Continue as guest</Link>
        </small>
      </div>
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </form>
  );
}
