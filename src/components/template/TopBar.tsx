import Title from './Title';
import UserAvatar from './UserAvatar';

interface TopBarProps {
  title: string;
  subtitle: string;
}

export default function TopBar(props: TopBarProps) {
  return (
    <div className="flex">
      <Title title={props.title} subtitle={props.subtitle} />
      <div className="flex flex-grow justify-end items-center">
        <UserAvatar className="ml-3" />
      </div>
    </div>
  );
}
