import  { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { Category } from "../interfaces.ts";
import { Link } from "react-router-dom";
import Burger from "@assets/burgerMenu.svg";

export default function Topbar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [categories, setCategories] = useState<Category[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const objetoRef = useRef<HTMLDivElement | null>(null);

  const alturaObjeto = useMemo(() => objetoRef.current?.clientHeight || 0, []);

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          "https://api.rdedigital.com/api/v2/categories"
        );
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 200);
    };

    const debounce = (func: () => void, delay: number) => {
      let timer: NodeJS.Timeout;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
      };
    };

    const debouncedScroll = debounce(handleScroll, 100);

    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, []);

  const formattedDate = useMemo(
    () =>
      currentDate.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    [currentDate]
  );

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const contenidoMarginTop = useMemo(
    () => (isScrolled ? alturaObjeto + 100 : 0),
    [isScrolled, alturaObjeto]
  );

  useEffect(() => {
    localStorage.setItem("marginTop", String(contenidoMarginTop));
  }, [contenidoMarginTop]);

  return (
    <header
      className={`top-0 w-screen bg-white px-4 pt-2 sm:px-8 lg:px-16 ${
        isScrolled ? "fixed shadow-md" : "sticky"
      } z-50`}
    >
      {!isScrolled && (
        <div id="unScrolled" ref={objetoRef}>
          {/* Topbar Superior */}
          <div
            id="topItems"
            className="font-MajritR flex flex-col items-center justify-between gap-2 sm:flex-row sm:px-4"
          >
            <div id="topItems-l" className="flex flex-wrap items-center gap-2 sm:gap-4">
              <p>{formattedDate}</p>
              <span className="hidden h-[1px] w-[.15rem] bg-gray-400 opacity-60 sm:block" />
              <p>{`Actualizado ${hours}:${minutes}`} </p>
              <span className="hidden h-[1px] w-[.15rem] bg-gray-400 opacity-60 sm:block" />
              <p>GMT-4</p>
              <div className="flex flex-row gap-2">
                <p>Seleccione:</p>
                <select
                  name="nations"
                  className="rounded-sm border-gray-300 px-2 py-1"
                >
                  <option value="España">España</option>
                  <option value="América">América</option>
                  <optgroup>
                    <option value="México">México</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Chile">Chile</option>
                    <option value="Argentina">Argentina</option>
                  </optgroup>
                  <option value="USA">España</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row gap-3" id="topItems-r">
              <button className="rounded bg-yellow-500 px-2 py-1 text-white font-semibold">
                Subscribete
              </button>
              <button className="rounded border-yellow-500 px-2 py-1 border text-yellow-500">
                Iniciar Sesión
              </button>
            </div>
          </div>

          {/* Centro */}
          <div id="centerText" className="text-center mt-4">
            <Link to="/">
              <h1 className="font-MajritB text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-black">
                EL PAÍS
              </h1>
            </Link>
            <p className="font-MajritL text-sm sm:text-base uppercase text-gray-600">
              El Periódico Global
            </p>
          </div>

          {/* Menú de Categorías */}
          <nav id="navContainer" className="mt-4">
            <ul className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Link
                  to={`/category/${category.category_post}`}
                  key={category.category_post}
                >
                  <p className="font-MajritL text-sm sm:text-base">
                    {category.category_post}
                  </p>
                </Link>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Topbar Scrolled */}
      {isScrolled && (
        <div
          id="scrolled"
          className="flex flex-row items-center justify-between p-2 sm:p-4"
        >
          <img
            className="h-6 w-6 sm:h-8 sm:w-8"
            src={Burger}
            alt="Menu"
            aria-label="Abrir menú"
          />
          <h1 className="font-MajritB text-xl sm:text-2xl lg:text-3xl text-center font-bold uppercase">
            <Link to="/">EL PAÍS</Link>
          </h1>
          <div className="flex flex-row gap-2 sm:gap-3">
            <button className="rounded bg-yellow-500 px-2 py-1 text-white font-semibold">
              Subscribete
            </button>
            <button className="rounded border-yellow-500 px-2 py-1 border text-yellow-500">
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
