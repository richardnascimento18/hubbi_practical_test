import Content from './Content';
import SideMenu from './SideMenu';
import TopBar from './TopBar';
import ForceAuth from '../auth/ForceAuth';

interface LayoutProps {
  title: string;
  subtitle: string;
  children?: any;
}

export default function Layout(props: LayoutProps) {
  return (
    <ForceAuth>
      <div className="flex h-screen w-screen">
        <SideMenu />
        <div className="flex flex-col w-full p-7 bg-indigo-900">
          <TopBar title={props.title} subtitle={props.subtitle} />
          <Content>{props.children}</Content>
        </div>
      </div>
    </ForceAuth>
  );
}
