import React, {useState, useEffect} from "react";
import {Post} from '../interfaces'
import axios from 'axios'

interface Props {
  category: string;
}

export default function CategorySection({ category }: Props) {


    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
      const getRecentPosts = async () => {
        try {
          const response = await axios.get<Post[]>(
            `https://apitest.rdedigital.com/api/v1/posts/category/`+ category 
          );
  
          console.log(category)
          if (response.data) {
            setPosts(response.data);
          }
        } catch (error) {
          console.error("Error al obtener los posts:", error);
        }
      };
  
      // Llama a la función para cargar los posts cuando el componente se monta
      getRecentPosts();
    }, []);

  return (
    <section id={`${category}Section`} className='pb-8 w-full'>
      {posts.length > 3 ? (
        <div>

      <div className='w-full border-b mb-4   border-black'>
        <span className="text-3xl font-extrabold text-left w-56 pb-2 border-b-[.3rem] border-black block "><h1>{category}</h1></span>
      </div>
        <div className='max-w-full w-full grid grid-cols-4 grid-rows-auto gap-4'>
          <div id='mostRecentPost' className='col-span-2'>
            <div className='flex flex-col items-center justify-center h-full'>
              <div id='imgContainer' className='h-80 w-full px-4'>
                <img
                  src={posts[0].media}
                  alt=''
                  className='object-cover h-full w-full'
                />
              </div>
              <p className='w-full text-right text-gray-500 italic mt-2'>
                {posts[0].title.rendered}
              </p>
              <h2 className='w-full text-black font-semibold text-3xl'>
                {posts[0].title.rendered}
              </h2>
              <p className='text-gray-800 text-left w-full text-sm mb-2'>
                {posts[0].author.name} | {posts[0].category}
              </p>
              <p>
                {posts[0].excerpt.rendered.substring(
                  3,
                  posts[0].excerpt.rendered.indexOf(".") + 1
                )}
              </p>
            </div>
          </div>

          <div id='recentPostCol' className='col-span-1 flex flex-col'>
            {posts.slice(1, 4).map((post) => (
              <div key={post.id} className='p-4  flex-grow'>
                <h2 className='text-black font-semibold text-xl'>
                  {post.title.rendered}
                </h2>
                <p className='text-gray-800 text-left text-sm'>
                  {post.author.name} | {post.category}
                </p>
                <div
                  className='truncate-overflow'
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered.substring(
                      3,
                      post.excerpt.rendered.indexOf(".") + 1
                    ),
                  }}
                />
              </div>
            ))}
          </div>

          <div id='recentPostCol' className='col-span-1 flex flex-col'>
            {posts.slice(4, 7).map((post) => (
              <div key={post.id} className='p-4  flex-grow'>
                <h2 className='text-black font-semibold text-xl'>
                  {post.title.rendered}
                </h2>
                <p className='text-gray-800 text-left text-sm'>
                  {post.author.name} | {post.category}
                </p>
                <div
                  className='truncate-overflow'
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered.substring(
                      3,
                      post.excerpt.rendered.indexOf(".") + 1
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        </div>
      ): <></>}
    </section>
  );
}
