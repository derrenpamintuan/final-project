export async function signIn(username, password) {
  return await signUpOrIn('sign-in', username, password);
}

export async function signUp(username, password) {
  return await signUpOrIn('sign-up', username, password);
}

export async function signUpOrIn(action, email, password) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };
  const res = await fetch(`/api/auth/${action}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
