import Footer from "@components/Footer";
import  { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  Topbar: JSX.Element;

}
export default function Layout({ children, Topbar }: LayoutProps) {
  return (
    <div className='flex flex-col  h-full w-full md:px-[7rem]'>
        {Topbar}
      <div className='flex-grow bg-white  p-4 top-[30rem] '>
        {children}
      </div>
      <Footer />
    </div>
  );
}
