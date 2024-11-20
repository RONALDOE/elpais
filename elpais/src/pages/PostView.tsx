import Layout from "@components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../interfaces";
import Topbar from "@components/Topbar";
import { useParams } from "react-router-dom";

export default function PostView() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Nuevo estado para controlar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Obtener datos del post
  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true); // Inicia el estado de carga
        if (postId) {
          const response = await axios.get<Post>(
            `https://api.rdedigital.com/api/v2/post/${postId}`
          );
          if (response.data) {
            setPost(response.data); // Establecer datos si la respuesta es válida
            setError(null); // Limpiar cualquier error previo
          } else {
            setError("No se encontraron datos para este post.");
          }
        }
      } catch (err) {
        console.error("Error al obtener el post:", err);
        setError("Ocurrió un error al cargar el post. Intente nuevamente más tarde.");
      } finally {
        setTimeout(() => {
          setLoading(false); // Finaliza el estado de carga después de 2 segundos
        }, 2000); // 2 segundos de espera
      }
    };

    getPost();
  }, [postId]);

  // Función para sanitizar HTML
  const sanitizeHTML = (html: string) => {
    const div = document.createElement("div");
    div.textContent = html;
    return div.innerHTML;
  };

  if (loading) {
    return (
      <Layout Topbar={<Topbar />}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-gray-700">Cargando...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout Topbar={<Topbar />}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold text-red-500">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout Topbar={<Topbar />}>
      <div className="px-4 sm:px-8 lg:px-16">
        {/* Categoría */}
        <div className="mb-4 border-b border-black">
          <span className="font-MajritB block w-full sm:w-56 border-b-[.3rem] border-black pb-2 text-left text-xl sm:text-2xl lg:text-3xl">
            {post?.category_post || "Categoría no disponible"}
          </span>
        </div>

        {/* Título y Resumen */}
        <div className="flex flex-col items-center justify-center mb-8 text-left">
          <h1 className="font-MajritB text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-center">
            {post?.title_post || "Título no disponible"}
          </h1>
          <h2
            className="font-MajritL mt-4 text-justify text-base sm:text-lg lg:text-xl"
            dangerouslySetInnerHTML={{
              __html: post?.content_post
                ? sanitizeHTML(
                    post.content_post.substring(
                      3,
                      post.content_post.indexOf(".") + 1
                    )
                  )
                : "Resumen no disponible",
            }}
          ></h2>
        </div>

        {/* Imagen */}
        <div className="mb-8 max-w-screen-lg mx-auto">
          {post?.media_post ? (
            <img
              src={post.media_post}
              alt={post.title_post || "Imagen del post"}
              className="w-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-center text-gray-500">Imagen no disponible</p>
          )}
          <p className="font-MajritR mt-2 text-right text-xs sm:text-sm text-gray-600">
            {post?.title_post || ""}
          </p>
          <p className="font-MajritB text-right text-xs sm:text-sm text-gray-700">
            {post?.author_name || "Autor desconocido"}
          </p>
        </div>

        {/* Contenido */}
        <div className="max-w-screen-lg mx-auto">
          <div
            className="font-MajritL text-justify text-sm sm:text-base lg:text-lg text-black leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post?.content_post
                ? sanitizeHTML(post.content_post.replace(/\n{2,}/g, "<br>"))
                : "<p>Contenido no disponible</p>",
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
