'use client'; 

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'

function PrivateRoute({ children }) {
  const router = useRouter()
  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure this runs only in the browser

    (async () => {
      if (!token) {
        router.push("/login");
        return;
      }

      const decodedJwt = jwt_decode(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        router.push("/login");
        return;
      }

      if (token) router.push("/");
    })();
  }, [token, router]);

  return children;
}

export default PrivateRoute;
