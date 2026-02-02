'use client';

import { useEffect, useState } from 'react';

export default function TestEnvPage() {
  const [status, setStatus] = useState<any>({
    backend: 'Checking...',
    token: 'Checking...',
    authApi: 'Checking...'
  });

  useEffect(() => {
    runTests();
  }, []);

  const runTests = async () => {
    const token = localStorage.getItem('token');

    // 1. Check backend health
    try {
      const res = await fetch('http://localhost:8080/actuator/health');
      if (res.ok) {
        setStatus((s: any) => ({ ...s, backend: '✅ Backend Running' }));
      } else {
        setStatus((s: any) => ({ ...s, backend: '❌ Backend Error' }));
      }
    } catch {
      setStatus((s: any) => ({ ...s, backend: '❌ Cannot reach backend' }));
    }

    // 2. Check token
    if (token) {
      setStatus((s: any) => ({ ...s, token: '✅ JWT Token Found' }));
    } else {
      setStatus((s: any) => ({ ...s, token: '❌ No Token (Login required)' }));
    }

    // 3. Check protected API
    if (token) {
      try {
        const res = await fetch('http://localhost:8080/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.ok) {
          setStatus((s: any) => ({ ...s, authApi: '✅ Auth API Working' }));
        } else {
          setStatus((s: any) => ({ ...s, authApi: '❌ Auth Failed' }));
        }
      } catch {
        setStatus((s: any) => ({ ...s, authApi: '❌ API Error' }));
      }
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: 'monospace' }}>
      <h1>Spring Boot Connection Test</h1>
      <pre>{JSON.stringify(status, null, 2)}</pre>
    </div>
  );
}
