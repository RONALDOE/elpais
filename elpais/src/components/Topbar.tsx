import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Category } from "../interfaces.ts";
import { Link } from "react-router-dom";
import Burger from "@assets/burgerMenu.svg";

export default function Topbar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [categories, setCategories] = useState<Category[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [alturaObjeto, setAlturaObjeto] = useState(0);
  const objetoRef = useRef(null);

  useEffect(() => {
    if (objetoRef.current) {
      const altura = objetoRef.current.clientHeight;
      setAlturaObjeto(altura);
    }
  }, [alturaObjeto]);

  useEffect(() => {
    const updateCurrentDate = () => {
      setCurrentDate(new Date());
    };

    const intervalId = setInterval(updateCurrentDate, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          "https://api.rdedigital.com/api/v2/categories",
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

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY >= 200) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const formattedDate = currentDate.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const contenidoMarginTop = isScrolled ? alturaObjeto + 100 : 0;
  localStorage.setItem("marginTop", String(contenidoMarginTop));
  console.clear()

  return (
    <header
      className={`  top-0 w-screen bg-white px-[7rem]  pt-2 ${
        isScrolled ? "scrolled-header fixed" : " sticky "
      }`}
    >
      {!isScrolled && (
        <div id="unScrolled" ref={objetoRef}>
          <div
            id="topItems"
            className="font-MajritR flex w-full flex-row items-center  justify-between px-4 "
          >
            <div id="topItems-l" className="flex flex-row gap-[.3rem]">
              <p>{formattedDate}</p>
              <span className="my-[.3rem] w-[.15rem] rounded-sm bg-gray-400 opacity-60" />{" "}
              <p>{`Actualizado ${hours}:${minutes}`} </p>
              <span className="my-[.3rem] w-[.2rem] rounded-sm bg-gray-400 opacity-60" />{" "}
              <p className="">GMT-4</p>
              <span className="my-[.3rem] w-[.15rem] rounded-sm bg-gray-400 opacity-60" />
              <div className="flex flex-row gap-4">
                <p>Seleccione:</p>
                <select
                  name="nations"
                  className="rounded-sm border-[1px]  border-gray-300 px-2 py-1 font-semibold"
                  id=""
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
              <button className="rounded-sm bg-yellow-500 px-2 py-1 font-semibold">
                Subscribete
              </button>
              <button className="rounded-sm border-[1px] border-yellow-500 px-2 py-1">
                Iniciar Sesión
              </button>
            </div>
          </div>

          <div
            id="centerText"
            className="flex flex-col items-center justify-center "
          >
            <Link to="/">
              <h1 className="font-MajritB -mb-4 select-none text-[4rem] font-bold  uppercase tracking-tighter text-black">
                EL PAÍS
              </h1>
            </Link>
            <p className="font-MajritL text-center font-semibold uppercase text-black">
              El Periódico global
            </p>
          </div>
          <div id="navContainer" className="">
            <ul className="mt-4 flex flex-row items-center justify-center gap-4 ">
              {categories.map((category) => (
                <Link
                  to={`/category/${category.category_post}`}
                  key={category.category_post}
                >
                  <p className="font-MajritL">{category.category_post}</p>
                </Link>
              ))}
            </ul>
            <div className="mt-4 flex-grow border-t border-black" />
          </div>
        </div>
      )}

      {isScrolled && (
        <div
          id="scrolled"
          className="flex flex-row items-center justify-between p-2"
        >
          <img className="h-24 w-24 " src={Burger}></img>
          <h1 className="font-MajritB -mb-4  w-24 flex-1 text-center text-[3rem] font-bold uppercase tracking-tighter text-black">
            <Link to="/">EL PAÍS</Link>
          </h1>
          <div className="font-MajritL flex flex-row gap-3" id="topItems-r ">
            <button className="rounded-sm bg-yellow-500 px-2 py-1 font-semibold">
              Subscríbete
            </button>
            <button className="rounded-sm border-[1px] border-yellow-500 px-2 py-1">
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

