import Footer from "@components/Footer";
import { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
  Topbar: JSX.Element;
}

export default function Layout({ children, Topbar }: LayoutProps) {
  const [marginTop, setMarginTop] = useState<number | null>(null);

  useEffect(() => {
    const storedMarginTop = localStorage.getItem("marginTop");
    setMarginTop(storedMarginTop ? parseInt(storedMarginTop) : 0);
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      {Topbar}
      <div
        className={`flex-grow bg-white px-4 sm:px-6 md:px-10 lg:px-20 ${
          marginTop !== null ? `mt-[${marginTop}px]` : "mt-0"
        }`}
        style={marginTop !== null ? { marginTop: `${marginTop}px` } : {}}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
