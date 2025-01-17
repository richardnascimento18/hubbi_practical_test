import useAuth from '@/data/hook/useAuth';
import { useEffect } from 'react';

export default function ForceAuth(props) {
  const { loadUserFromCookies } = useAuth();

  function renderContent() {
    return <>{props.children}</>;
  }

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  return renderContent();
}
