import React, { useState, useEffect } from 'react';

const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newErrors = { email: '', password: '' };
    if (touched.email && !isValidEmail(email.trim())) newErrors.email = 'Please enter a valid email.';
    if (touched.password && password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
  }, [email, password, touched]);

  const canSubmit = isValidEmail(email.trim()) && password.length >= 6 && !loading;

  const handleSubmit = e => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!canSubmit) return;

    setLoading(true);



    // Simulate async login
    setTimeout(() => {
      const fakeToken = 'fake-jwt-token-123';
      onLogin(fakeToken, email, rememberMe);
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="form-container" aria-label="Login Form">
      <h1>Login</h1>

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onBlur={() => setTouched(t => ({ ...t, email: true }))}
        aria-invalid={errors.email ? "true" : "false"}
        aria-describedby="email-error"
        required
      />
      {errors.email && <p className="error" id="email-error">{errors.email}</p>}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onBlur={() => setTouched(t => ({ ...t, password: true }))}
        aria-invalid={errors.password ? "true" : "false"}
        aria-describedby="password-error"
        required
        minLength={6}
      />
      {errors.password && <p className="error" id="password-error">{errors.password}</p>}

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={() => setRememberMe(r => !r)}
        />
        <label htmlFor="rememberMe">Remember me</label>
      </div>

      <button type="submit" disabled={!canSubmit}>
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}

export default LoginForm;
