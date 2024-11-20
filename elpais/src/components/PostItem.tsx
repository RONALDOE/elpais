import { Link } from "react-router-dom";
import { Post } from "interfaces";

interface PostItemProps {
  post: Post;
}

function PostItem({ post }: PostItemProps) {
  return (
    <div className="mb-4 flex w-full flex-col gap-4 rounded border border-gray-300 p-4 shadow sm:flex-row sm:gap-6 lg:w-2/3">
      <Link to={`/post/${post.id_wordpress}`} className="flex-shrink-0">
        <img
          src={post.media_post}
          alt={post.title_post}
          className="h-auto w-full rounded sm:max-h-[12em] sm:w-[18rem] lg:max-h-[15em]"
        />
      </Link>
      <div className="flex flex-col gap-2">
        <Link to={`/post/${post.id_wordpress}`}>
          <h2 className="font-MajritB text-lg sm:text-xl">{post.title_post}</h2>
        </Link>
        <div
          className="font-MajritL text-sm text-gray-700 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: post.content_post.substring(
              0,
              post.content_post.indexOf(".") + 1,
            ),
          }}
        />
        <Link
          to={`/post/${post.id_wordpress}`}
          className="font-MajritR mt-2 inline-block font-bold text-blue-600 hover:text-blue-800"
        >
          Leer Más
        </Link>
      </div>
    </div>
  );
}

export default PostItem;
