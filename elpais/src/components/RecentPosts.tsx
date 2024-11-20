import  { useEffect, useState } from "react";
import { Post } from "../interfaces.ts";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RecentNews() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "https://api.rdedigital.com/api/v2/posts/"
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
    <section className="pb-8" id="recentNewsSection">
      {posts.length > 0 && (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Primer Post Destacado */}
          <div
            id="mostRecentPost"
            className="col-span-1 lg:col-span-2 flex flex-col items-center"
          >
            <div className="h-64 w-full overflow-hidden rounded shadow">
              <Link to={`post/${posts[0].id}`}>
                <img
                  src={posts[0].media_post}
                  alt={posts[0].title_post}
                  className="h-full w-full object-cover"
                />
              </Link>
            </div>
            <p className="font-MajritL mt-2 text-xs text-gray-500">
              {posts[0].title_post}
            </p>
            <Link to={`post/${posts[0].id_wordpress}`}>
              <h2 className="font-MajritB mt-2 text-xl font-semibold text-black sm:text-2xl">
                {posts[0].title_post}
              </h2>
            </Link>
            <p className="font-MajritR mt-1 text-sm text-gray-800">
              {posts[0].author_name} | {posts[0].category_post}
            </p>
            <p className="font-MajritL mt-2 text-sm text-gray-700 line-clamp-3">
              {posts[0].content_post.substring(
                3,
                posts[0].content_post.indexOf(".") + 1
              )}
            </p>
          </div>

          {/* Posts Secundarios */}
          {posts.slice(1, 7).map((post) => (
            <div
              key={post.id_wordpress}
              className="col-span-1 flex flex-col overflow-hidden rounded border border-gray-300 p-4 shadow"
            >
              <Link to={`post/${post.id_wordpress}`}>
                <h2 className="font-MajritB text-lg font-semibold text-black sm:text-xl">
                  {post.title_post}
                </h2>
                <p className="font-MajritR mt-1 text-sm text-gray-800">
                  {post.author_name} | {post.category_post}
                </p>
                <div
                  className="font-MajritL mt-2 text-sm text-gray-700 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: post.content_post.substring(
                      3,
                      post.content_post.indexOf(".") + 1
                    ),
                  }}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
