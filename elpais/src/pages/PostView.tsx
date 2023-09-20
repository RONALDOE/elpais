import Layout from "@components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Post } from "../interfaces";
import Topbar from "@components/Topbar";
import { useParams } from "react-router-dom";

export default function PostView() {
  const { postId } = useParams();

  // Accedemos a los valores

  //Accedemos a los valores

  const [post, setPost] = useState<Post | null>(null); // Inicializa post como null

  useEffect(() => {
    const getPost = async () => {
      try {
        if (postId) {
          // Verifica si postId tiene un valor válido
          const response = await axios.get<Post>(
            "https://apitest.rdedigital.com/api/v1/posts/" + postId
          );
          const data = response.data;
          setPost(data);
        }
      } catch (error) {
        console.log("Error al obtener el post:", error);
      }
    };

    // Llama a getPost solo si postId es válido
    getPost();
  }, []);

  useEffect(() => {
    console.log(post);
  }, [post]);
  return (
    <Layout Topbar={<Topbar />}>
      <div>
        <div className='w-full border-b mb-4   border-black'>
          <span className='text-3xl font-extrabold text-left w-56 pb-2 border-b-[.3rem] border-black block '>
            <h1>{post?.category}</h1>
          </span>
        </div>

        <div className='flex flex-col justify-center items-center text-left w-full p-12'>
          <h1 className='text-[2.5rem] text-justify font-extrabold '>
            {post?.title.rendered}
          </h1>
          <h2
            className='text-[1.4rem] text-justify font-ligth mt-2'
            dangerouslySetInnerHTML={{
              __html: post?.excerpt?.rendered
              ? post.excerpt.rendered.substring(
                  3,
                  post.excerpt.rendered.indexOf(".") + 1
                )
              : "",
            }}
          ></h2>
        </div>

        <img src={post?.media} alt='' className='w-full h-[auto]' />

        <div className="w-full text-sm "

dangerouslySetInnerHTML={{
  __html: post?.content?.rendered ? post.content.rendered : ""
  
}}
        ></div>
      </div>
    </Layout>
  );
}
