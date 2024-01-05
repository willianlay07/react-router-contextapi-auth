import PostListsItem from "./PostListsItem";

const PostLists = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <PostListsItem
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
        />
      ))}
    </ul>
  );
};

export default PostLists;
