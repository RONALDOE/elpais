import Footer from "@components/Footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  Topbar: JSX.Element;
}
const marginTop = localStorage.getItem("marginTop");
console.log(marginTop);
export default function Layout({ children, Topbar }: LayoutProps) {
  return (
    <div className="flex h-full  w-full flex-col ">
      {Topbar}
      <div
        className={`flex-grow bg-white  p-4 mt-[${marginTop}rem] px-[7rem] `}
        style={{ marginTop: `${marginTop}px` }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
