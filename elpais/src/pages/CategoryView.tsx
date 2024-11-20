import  { useEffect, useState } from "react";
import Layout from "@components/Layout";
import Topbar from "@components/Topbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Post } from "interfaces";
import PostItem from "@components/PostItem";

export default function CategoryView() {
  const { category } = useParams();
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        if (category) {
          const response = await axios.get<Post[]>(
            `https://api.rdedigital.com/api/v2/posts/${category}`,
          );
          const data = response.data;
          setPosts(data);
        }
      } catch (error) {
        console.log("Error al obtener los posts:", error);
      }
    };

    getPosts();
  }, [category]);

  return (
    <Layout Topbar={<Topbar />}>
      <div>
        <div className="mb-4 w-full border-b border-black">
          <span className="font-MajritB block w-56 border-b-[.3rem] border-black pb-2 text-left text-3xl">
            <h1>{category}</h1>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {posts && posts.map((post) => <PostItem key={post.id_wordpress} post={post} />)}
      </div>
    </Layout>
  );
}
