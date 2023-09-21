import React, { useState, useEffect } from "react";
import { Post } from "../interfaces";
import axios from "axios";
import LineDivider from "@components/LineDivider";
import { Link } from "react-router-dom";
Link;
interface Props {
  category: string;
}

export default function CategorySection({ category }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          `https://apitest.rdedigital.com/api/v1/posts/category/` + category,
        );

        console.log(category);
        if (response.data) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }
    };

    getRecentPosts();
  }, []);

  return (
    <section id={`${category}Section`} className="w-full pb-8">
      {posts.length > 3 ? (
        <div>
          <div className="font-MajritL mb-4 w-full   border-b border-black">
            <span className="font-MajritB block w-56 border-b-[.3rem]  border-black pb-2 text-left text-3xl font-extrabold ">
              <h1>{category}</h1>
            </span>
          </div>
          <div className="grid-rows-auto grid w-full max-w-full grid-cols-4 gap-4">
            <div id="mostRecentPost" className="col-span-2">
              <div className="flex h-full  flex-col justify-center">
                <Link to={`post/${posts[0].id}`}>
                  <div
                    id="imgContainer"
                    className="hover-translate-y h-80 w-full px-4 "
                    style={{ backgroundImage: `url(${posts[0].media})` }}
                  />
                </Link>
                <p className="font-MajritL mt-2 w-full text-right text-[.8rem] text-gray-500">
                  {posts[0].title.rendered}
                </p>
                <Link to={`post/${posts[0].id}`}>
                  <h2 className="hover-translate-y font-MajritB w-full text-3xl font-semibold  text-black">
                    {posts[0].title.rendered}
                  </h2>
                </Link>
                <p className="font-MajritR mb-2 w-full text-left text-sm text-gray-800">
                  {posts[0].author.name} | {posts[0].category}
                </p>
                <p className="font-MajritL">
                  {posts[0].excerpt.rendered.substring(
                    3,
                    posts[0].excerpt.rendered.indexOf(".") + 1,
                  )}
                </p>
              </div>
            </div>

            <div id="recentPostCol" className="col-span-1 flex flex-col">
              {posts.slice(1, 4).map((post) => (
                <div key={post.id} className="flex-grow  p-4">
                  <Link to={`post/${post.id}`}>
                    <h2 className="hover:hover-translate-y font-MajritB text-xl font-semibold text-black ">
                      {post.title.rendered}
                    </h2>
                    <p className="font-MajritR text-left text-sm text-gray-800">
                      {post.author.name} | {post.category}
                    </p>
                    <div
                      className="truncate-overflow font-MajritL"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered.substring(
                          3,
                          post.excerpt.rendered.indexOf(".") + 1,
                        ),
                      }}
                    />
                  </Link>
                </div>
              ))}
            </div>

            <div id="recentPostCol" className="col-span-1 flex flex-col">
              {posts.slice(4, 7).map((post) => (
                <div key={post.id} className="flex-grow  p-4 ">
                  <Link to={`post/${post.id}`}>
                    <h2 className="hover:hover-translate-y font-MajritB text-xl font-semibold text-black">
                      {post.title.rendered}
                    </h2>
                    <p className="font-MajritR text-left text-sm text-gray-800">
                      {post.author.name} | {post.category}
                    </p>
                    <div
                      className="truncate-overflow font-MajritL"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered.substring(
                          3,
                          post.excerpt.rendered.indexOf(".") + 1,
                        ),
                      }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <LineDivider />
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
