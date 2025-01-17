import useAuth from '@/data/hook/useAuth';

interface UserAvatarProps {
  className?: string;
}

export default function UserAvatar(props: UserAvatarProps) {
  const { user } = useAuth();

  return (
    <img
      src={user?.imageURL ?? '/images/avatar.svg'}
      alt="User Profile"
      className={`
          h-10 w-10 rounded-full
          ${props.className}
        `}
    />
  );
}
