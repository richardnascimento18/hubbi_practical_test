import useAuth from '@/data/hook/useAuth';
import { PurchaseIcon, SalesIcon, LogOutIcon } from '../icons';
import Logo from './Logo';
import MenuItem from './MenuItem';

export default function SideMenu() {
  const { logOut } = useAuth();
  return (
    <aside className="flex flex-col bg-indigo-800 drop-shadow-xl">
      <div className="flex flex-col items-center justify-center h-20 w-20 bg-gradient-to-r from-indigo-500 to-purple-800">
        <Logo />
      </div>
      <ul className="flex-grow">
        <MenuItem url="/" text="Vendas" icon={SalesIcon} />
        <MenuItem url="/purchase" text="Compras" icon={PurchaseIcon} />
      </ul>
      <ul>
        <MenuItem
          onClick={logOut}
          text="Log Out"
          icon={LogOutIcon}
          className="text-red-600 hover:bg-red-400 hover:text-white transition-colors dark:text-red-400 dark:hover:text-white"
        />
      </ul>
    </aside>
  );
}
