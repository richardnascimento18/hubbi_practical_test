import { MoonIcon, SunIcon } from '../icons';

interface SwitchThemeButtonProps {
  theme?: string;
  switchTheme?: () => void;
}

export default function SwitchThemeButton(props: SwitchThemeButtonProps) {
  return props.theme === 'dark' ? (
    <div
      onClick={props.switchTheme}
      className={`
      hidden sm:flex items-center w-14 lg:w-24 h-8 p-1 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-600 cursor-pointer
    `}
    >
      <div
        className={`
        flex items-center justify-center bg-white text-yellow-600 w-6 h-6 rounded-full
      `}
      >
        {SunIcon}
      </div>
      <div
        className={`
        hidden lg:flex items-center ml-4 text-white
      `}
      >
        <span className="text-sm">Claro</span>
      </div>
    </div>
  ) : (
    <div
      onClick={props.switchTheme}
      className={`
      hidden sm:flex items-center justify-end w-14 lg:w-24 h-8 p-1 rounded-full bg-gradient-to-r from-gray-500 to-gray-900 cursor-pointer
    `}
    >
      <div
        className={`
        hidden lg:flex items-center mr-4 text-gray-300
      `}
      >
        <span className="text-sm">Escuro</span>
      </div>
      <div
        className={`
        flex items-center justify-center bg-black text-yellow-300 w-6 h-6 rounded-full
      `}
      >
        {MoonIcon}
      </div>
    </div>
  );
}
