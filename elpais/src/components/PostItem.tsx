import { Link } from "react-router-dom";
import { Post } from "interfaces";

interface PostItemProps {
  post: Post;
}

function PostItem({ post }: PostItemProps) {
  return (
    <div className="mb-4 flex w-2/3 flex-row gap-2 border border-gray-300 p-4">
      <Link to={`/post/${post.id}`}>
        <img
          src={post.media_post}
          alt={post.title_post}
          className="max-h-[15em]  min-h-[12em] min-w-[20rem]"
        />
      </Link>
      <div className="flex flex-col gap-2   ">
        <Link to={`/post/${post.id}`}>
          <h2 className="font-MajritB mt-2 text-xl ">{post.title_post}</h2>
        </Link>
        <div
          className="truncate-overflow font-MajritL"
          dangerouslySetInnerHTML={{
            __html: post.content_post.substring(
              0,
              post.content_post.indexOf(".") + 1,
            ),
          }}
        />
        <Link
          to={`/post/${post.id}`}
          className="font-MajritR mt-2 block font-bold text-blue-700"
        >
          Leer Más
        </Link>
      </div>
    </div>
  );
}

export default PostItem;
