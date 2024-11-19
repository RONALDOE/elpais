import React, { useEffect, useState } from "react";
import { Post } from "../interfaces.ts";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RecentNews() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "https://api.rdedigital.com/api/v2/posts/",
        );

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
    <section className=" doubleLineSeparator pb-8" id="recentNewsSection">
      {posts.length > 0 && (
        <div className="grid-rows-auto grid w-full max-w-full grid-cols-4 gap-4">
          <div id="mostRecentPost" className="col-span-2">
            <div className="flex h-full flex-col items-center justify-center">
              <div id="" className="h-80 w-full px-4">
                <Link to={`post/${posts[0].id}`}>
                  <img
                    src={posts[0].media_post}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </Link>
              </div>
              <p className="font-MajritL mt-2 w-full text-right text-[.8rem]  text-gray-500">
                {posts[0].title_post}
              </p>
              <Link to={`post/${posts[0].id}`}>
                <h2 className="font-MajritB w-full text-3xl font-semibold text-black">
                  {posts[0].title_post}
                </h2>
              </Link>

              <p className="font-MajritR mb-2 w-full text-left text-sm text-gray-800">
                {posts[0].author_name} | {posts[0].category_post}
              </p>
              <p className="font-MajritL">  
                {posts[0].content_post.substring(
                  3,
                  posts[0].content_post.indexOf(".") + 1,
                )}
              </p>
            </div>
          </div>

          <div
            id="recentPostCol"
            className="font-MajritL col-span-1 flex flex-col"
          >
            {posts.slice(1, 4).map((post) => (
              <div key={post.id} className="flex-grow  p-4">
                <Link to={`post/${post.id}`}>
                  <h2 className="font-MajritB text-xl font-semibold text-black">
                    {post.title_post}
                  </h2>
                  <p className="font-MajritR text-left text-sm text-gray-800">
                    {post.author_name} | {post.category_post}
                  </p>
                  <div
                    className="truncate-overflow font-MajritL"
                    dangerouslySetInnerHTML={{
                      __html: post.content_post.substring(
                        3,
                        post.content_post.indexOf(".") + 1,
                      ),
                    }}
                  />
                </Link>
              </div>
            ))}
          </div>

          <div id="recentPostCol" className="col-span-1 flex flex-col ">
            {posts.slice(4, 7).map((post) => (
              <Link to={`post/${post.id}`}>
                <div key={post.id} className="flex-grow  p-4">
                  <h2 className="font-MajritB text-xl font-semibold text-black">
                    {post.title_post}
                  </h2>
                  <p className="font-MajritR text-left text-sm text-gray-800">
                    {post.author_name} | {post.category_post}
                  </p>
                  <div
                    className="truncate-overflow font-MajritL"
                    dangerouslySetInnerHTML={{
                      __html: post.content_post.substring(
                        3,
                        post.content_post.indexOf(".") + 1,
                      ),
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
