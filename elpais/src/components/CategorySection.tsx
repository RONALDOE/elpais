import  { useState, useEffect } from "react";
import { Post } from "../interfaces";
import axios from "axios";
import LineDivider from "@components/LineDivider";
import { Link } from "react-router-dom";

interface Props {
  category: string;
}

export default function CategorySection({ category }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          `https://api.rdedigital.com/api/v2/posts/` + category
        );

        if (response.data) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }
    };

    getRecentPosts();
  }, [category]);

  return (
    <section
      id={`${category}Section`}
      className="w-full pb-8 px-4 sm:px-6 lg:px-8"
    >
      {posts.length > 3 ? (
        <div>
          <div className="font-MajritL mb-4 border-b border-black">
            <span className="font-MajritB block w-fit border-b-4 border-black pb-2 text-left text-2xl sm:text-3xl font-extrabold">
              <h1>{category}</h1>
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {/* Post destacado */}
            <div id="mostRecentPost" className="col-span-full lg:col-span-2">
              <div className="flex h-full flex-col">
                <Link to={`post/${posts[0].id}`}>
                  <div
                    id="imgContainer"
                    className="hover:scale-105 h-56 sm:h-72 lg:h-80 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${posts[0].media_post})` }}
                  />
                </Link>
                <p className="font-MajritL mt-2 text-right text-xs sm:text-sm text-gray-500">
                  {posts[0].title_post}
                </p>
                <Link to={`post/${posts[0].id}`}>
                  <h2 className="hover:text-gray-700 font-MajritB text-xl sm:text-2xl lg:text-3xl font-semibold text-black">
                    {posts[0].title_post}
                  </h2>
                </Link>
                <p className="font-MajritR mb-2 text-sm text-gray-800">
                  {posts[0].author_name} | {posts[0].category_post}
                </p>
                <p className="font-MajritL text-sm">
                  {posts[0].content_post.substring(
                    3,
                    posts[0].content_post.indexOf(".") + 1
                  )}
                </p>
              </div>
            </div>

            {/* Columnas de posts recientes */}
            {posts.slice(1).map((post) => (
              <div
                key={post.id_wordpress}
                className="flex flex-col p-4 bg-gray-50 shadow-md hover:shadow-lg rounded-lg"
              >
                <Link to={`post/${post.id_wordpress}`}>
                  <h2 className="hover:text-gray-700 font-MajritB text-lg sm:text-xl font-semibold text-black">
                    {post.title_post}
                  </h2>
                  <p className="font-MajritR text-sm text-gray-800">
                    {post.author_name} | {post.category_post}
                  </p>
                  <p className="truncate-overflow font-MajritL text-sm text-gray-600">
                    {post.content_post.substring(
                      3,
                      post.content_post.indexOf(".") + 1
                    )}
                  </p>
                </Link>
              </div>
            ))}
          </div>
          <LineDivider />
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
