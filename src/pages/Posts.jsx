import { usePost } from "../context/PostProvider";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
import PostLists from "../features/posts/PostLists";

const Posts = () => {
  const { posts, isLoading, isError } = usePost();

  return (
    <div>
      <h1>Posts</h1>
      {isLoading ? <Loading /> : <PostLists posts={posts} />}
      {isError && <Error message={isError} />}
    </div>
  );
};

export default Posts;
