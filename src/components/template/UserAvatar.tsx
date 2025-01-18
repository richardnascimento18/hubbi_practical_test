interface UserAvatarProps {
  className?: string;
}

export default function UserAvatar(props: UserAvatarProps) {
  return (
    <img
      src="/images/avatar.svg"
      alt="User Profile"
      className={`
          h-10 w-10 rounded-full
          ${props.className}
        `}
    />
  );
}
