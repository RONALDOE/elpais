import Layout from "@components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Post } from "../interfaces";
import Topbar from "@components/Topbar";
import { useParams } from "react-router-dom";

export default function PostView() {
  const { postId } = useParams();

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        if (postId) {
          const response = await axios.get<Post>(
            "https://apitest.rdedigital.com/api/v1/posts/" + postId,
          );
          const data = response.data;
          setPost(data);
        }
      } catch (error) {
        console.log("Error al obtener el post:", error);
      }
    };

    getPost();
  }, []);

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <Layout Topbar={<Topbar />}>
      <div>
        <div className="mb-4 w-full border-b border-black">
          <span className="font-MajritB block w-56 border-b-[.3rem] border-black pb-2 text-left text-3xl ">
            <h1>{post?.category}</h1>
          </span>
        </div>

        <div className="flex w-full flex-col items-center justify-center p-12 text-left">
          <h1 className="font-MajritB text-justify text-[2.5rem] font-extrabold">
            {post?.title.rendered}
          </h1>
          <h2
            className="font-MajritL mt-2 text-justify text-[1.4rem]"
            dangerouslySetInnerHTML={{
              __html: post?.excerpt?.rendered
                ? post.excerpt.rendered.substring(
                    3,
                    post.excerpt.rendered.indexOf(".") + 1,
                  )
                : "",
            }}
          ></h2>
        </div>
        <div className="mb-12 w-[50rem] border-b-[1px] border-black pb-4">
          <img src={post?.media} alt="" className="h-[auto] w-[50rem]" />
          <p className="font-MajritR text-right text-[.8rem] font-normal">
            {post?.title.rendered}
          </p>
          <p className="font-MajritB text-right text-[.8rem] font-medium">
            {post?.author.name}
          </p>
        </div>

        <div className="flex w-[50rem] justify-center">
          <div
            className="font-MajritL px-12 text-justify text-xl font-normal text-black"
            dangerouslySetInnerHTML={{
              __html: post?.content?.rendered
                ? post.content.rendered.replace(/\n{2,}/g, "<br>")
                : "",
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
