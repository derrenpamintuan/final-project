import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpOrIn } from '../lib';

export default function AuthForm({ action, onSignIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState<unknown>();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData.entries());
    try {
      const result = await signUpOrIn(action, email, password);
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
  const alternateErrorText =
    action === 'sign-up'
      ? 'Email is already registered'
      : 'Incorrect email or password';

  return (
    <form onSubmit={handleSubmit}>
      <div className="email">
        <label>
          <p className="email-label">Username</p>
          <input
            required
            autoFocus
            autoComplete="off"
            type="text"
            name="email"
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
      </div>
      {!!error && <div style={{ color: 'red' }}>{alternateErrorText}</div>}
    </form>
  );
}
