import Link from 'next/link';

interface MenuItemProps {
  url?: string;
  text: string;
  icon: any;
  className?: string;
  onClick?: (event: any) => void;
}

export default function MenuItem(props: MenuItemProps) {
  function renderLink() {
    return (
      <span
        className={`flex flex-col justify-center items-center w-20 h-20 text-indigo-100 ${props.className}`}
      >
        {props.icon}
        <span className="text-xs font-light">{props.text}</span>
      </span>
    );
  }

  return (
    <li
      onClick={props.onClick}
      className="hover:bg-indigo-400 transition-colors cursor-pointer"
    >
      {props.url ? <Link href={props.url}>{renderLink()}</Link> : renderLink()}
    </li>
  );
}
