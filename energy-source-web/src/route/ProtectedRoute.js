'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function ProtectedRoute(props) {
  const router = useRouter()
  const token = useSelector((state) => state.auth.token);
  
  useEffect(() => {
    (async () => {
      if (!token) {
        return router.push("/login");
      }
  
      if (token) return router.push("/dashboard");
    })();
  }, [token, router]);

  return  props.children ;
}

export default ProtectedRoute



// // src/components/ProtectedRoute.js
// 'use client';
// import { useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function ProtectedRoute({ children }) {
//   const token = useSelector((state) => state.auth.token);
//   const router = useRouter();
// console.log("token", token, children)
//   useEffect(() => {
//     if (token === null || token === undefined) {
//       router.push('/login');
//     }
//   }, [token, router]);

//   return token ? children : null;
// }

