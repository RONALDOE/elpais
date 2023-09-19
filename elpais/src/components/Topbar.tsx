import React, { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "../interfaces.ts";

export default function Topbar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [categories, setCategories] = useState<Category[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Función para actualizar la fecha actual cada segundo
    const updateCurrentDate = () => {
      setCurrentDate(new Date());
    };

    // Actualizar la fecha cada segundo (1000 milisegundos)
    const intervalId = setInterval(updateCurrentDate, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  useEffect (()=>{
    const getCategories = async () => {
      try {
        const response = await axios.get<Category[]>('https://api.rdedigital.com/api/v2/categories');
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        
          console.error('Error al obtener las categorías:', error);
      }
    };
    getCategories()
  },[])

    const handleScroll = () => {
      // Obtener la posición actual del scroll
      const scrollY = window.scrollY;
      
      // Establecer el estado isScrolled en función de la posición del scroll
      if (scrollY >=100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      console.log("Scroll position: ", scrollY);
    };


    // Agregar un event listener para el evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpia el event listener cuando el componente se desmonta



  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Formatear la fecha en español
  const formattedDate = currentDate.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className={`w-full pt-2 top-0 sticky z-20  bg-white ${isScrolled ? "scrolled-header" : ""}`}>
      {!isScrolled && (
        <div id='unScrolled'>
          <div
            id='topItems'
            className='px-4 flex flex-row items-center justify-between  w-full '
          >
            <div id='topItems-l' className='flex flex-row gap-[.3rem]'>
              <p>{formattedDate}</p>
              <span className='w-[.15rem] rounded-sm opacity-60 my-[.3rem] bg-gray-400' />{" "}
              {/* Línea horizontal */}
              <p>{`Actualizado ${hours}:${minutes}`} </p>
              <span className='w-[.2rem] rounded-sm opacity-60 my-[.3rem] bg-gray-400' />{" "}
              {/* Línea horizontal */}
              <p className=''>GMT-4</p>
              <span className='w-[.15rem] rounded-sm opacity-60 my-[.3rem] bg-gray-400' />
              <div className='flex flex-row gap-4'>
                <p>Seleccione:</p>
                <select
                  name='nations'
                  className='px-2 py-1  border-[1px] border-gray-300 rounded-sm font-semibold'
                  id=''
                >
                  <option value='España'>España</option>
                  <option value='América'>América</option>
                  <optgroup>
                    <option value='México'>México</option>
                    <option value='Colombia'>Colombia</option>
                    <option value='Chile'>Chile</option>
                    <option value='Argentina'>Argentina</option>
                  </optgroup>
                  <option value='USA'>España</option>
                </select>
              </div>
            </div>
            <div className='flex flex-row gap-3' id='topItems-r'>
              <button className='px-2 py-1 bg-yellow-500 rounded-sm font-semibold'>
                Subscribete
              </button>
              <button className='px-2 py-1 border-[1px] border-yellow-500 rounded-sm'>
                Iniciar Sesión
              </button>
            </div>
          </div>

          <div
            id='centerText'
            className='flex flex-col justify-center items-center '
          >
            <h1 className='text-[4rem]  text-black font-bold tracking-tighter  uppercase -mb-4'>
              EL PAÍS
            </h1>
            <p className='text-center text-black font-semibold uppercase'>
              El Periódico global
            </p>
          </div>
          <div id='navContainer' className=''>
            <ul className='flex flex-row gap-4 items-center justify-center mt-4 '>
              {categories.map((category) => (
                <li key={category.category_post}>{category.category_post}</li>
              ))}
            </ul>
            <div className='flex-grow border-t border-black mt-4' />
          </div>
        </div>
      )}
      
      {isScrolled && (
  <div id='scrolled' className="flex flex-row items-center justify-between p-2">
    <div className="w-12 h-12 bg-red-900"></div>
    <h1 className='text-[3rem] w-24  text-black font-bold tracking-tighter uppercase -mb-4 flex-1 text-center'>
      EL PAÍS
    </h1>
    <div className='flex flex-row gap-3' id='topItems-r'>
      <button className='px-2 py-1 bg-yellow-500 rounded-sm font-semibold'>
        Subscríbete
      </button>
      <button className='px-2 py-1 border-[1px] border-yellow-500 rounded-sm'>
        Iniciar Sesión
      </button>
    </div>
  </div>
)}










    </header>
  );
}
