'use client';
import Image from 'next/image';
import Styles from './login.module.css';
import Logo from '../../public/images/Ad_login.png';
import { useState } from 'react';
import Head from 'next/head';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleForgotPasswordClick = () => {
    alert('Please contact your administrator at editor@asiandispatch.net for assistance to reset your password.');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      // First request to the user-role URL
      const roleResponse = await fetch('http://127.0.0.1:8000/api/user-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRF-TOKEN': csrfToken,

        },
        body: JSON.stringify({ email, password }),
      });

      const roleData = await roleResponse.json();
      console.log(roleData);
      if (roleResponse.ok && roleData.success) {
        // Store role in localStorage
        localStorage.setItem('role', roleData.role);

        // Send the second request to the login URL
        const loginResponse = await fetch('http://127.0.0.1:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'X-CSRF-TOKEN': csrfToken,
          },
          body: JSON.stringify({ email: roleData.email, password: roleData.password }),
        });

        const loginData = await loginResponse.json();
        console.log(loginData);


        if (loginResponse.ok) {
          window.location.href = loginData.dashboard_url;


        } else {
          setError(loginData.error || 'Login failed');
        }
      } else {
        setError(roleData.error || 'Failed to retrieve user role');
      }
    } catch (error) {
      setError('An error occurred. Please try again.' + error);
    }
  };



  return (
    <>

      <div className={Styles.container}>
        <div className={Styles.box}>
          <div className={Styles.image}>
            <Image src={Logo} alt='Asian Dispatch' width={203} height={39} />
          </div>
          <form className={Styles.form} onSubmit={handleSubmit}>
            <div className={Styles.email}>
              <input
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={Styles.password}>
              <input
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className={Styles.error}>{error}</div>}
            <div className={Styles.button}>
              <input type='submit' value='Login' />
            </div>
            <div className={Styles.forgot}>
              <a href="#" onClick={handleForgotPasswordClick}>Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
