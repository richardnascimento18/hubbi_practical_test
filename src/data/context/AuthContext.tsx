import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Image from 'next/image';
import loadingGif from '../../../public/images/loading.gif';
interface User {
  id: string;
  email: string;
}

interface AuthContextProps {
  user?: User;
  loading?: boolean;
  login?: (email: string, password: string) => Promise<void>;
  signup?: (email: string, password: string) => Promise<void>;
  logOut?: () => void;
  loadUserFromCookies?: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps>({});

function manageCookie(isLoggedIn: boolean, token?: String | null) {
  if (isLoggedIn) {
    Cookies.set('admin-template-auth', token, {
      expires: 7,
    });
  } else {
    Cookies.remove('admin-template-auth');
  }
}

export function AuthProvider(props: any) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  async function configureSession(user: User | null, token: String | null) {
    if (user && token) {
      setUser(user);
      manageCookie(true, token);
    } else {
      setUser(null);
      manageCookie(false);
    }
    setLoading(false);
  }

  async function signup(userEmail: string, userPassword: string) {
    try {
      setLoading(true);

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          JSON.stringify({
            error: { message: errorData.error || 'Cadastro falhou!' },
          }),
        );
      }

      router.push('/authentication');
    } finally {
      setLoading(false);
    }
  }

  async function login(userEmail: string, userPassword: string) {
    try {
      setLoading(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const { token, user } = await response.json();
      await configureSession(user, token);
      router.push('/');
    } finally {
      setLoading(false);
    }
  }

  async function loadUserFromCookies() {
    const token = Cookies.get('admin-template-auth');
    if (token) {
      try {
        const response = await fetch('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const { valid, user } = await response.json();
          if (valid) {
            setUser(user);
          }
        } else {
          Cookies.remove('admin-template-auth');
          router.push('/authentication');
        }
      } catch (error) {
        Cookies.remove('admin-template-auth');
        router.push('/authentication');
      }
    } else if (!token) {
      router.push('/authentication');
    }

    setLoading(false);
    return true;
  }

  function logOut() {
    Cookies.remove('admin-template-auth');
    setUser(null);
    router.push('/authentication');
  }

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  function loadingScreen() {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-400/20 absolute w-screen">
        <Image src={loadingGif} alt="Loading Gif" width={100} height={100} />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logOut, loadUserFromCookies }}
    >
      {loading && loadingScreen()}
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
