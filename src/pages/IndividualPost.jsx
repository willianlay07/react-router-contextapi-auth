import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../context/PostProvider";
import Loading from "../ui/Loading";
import Error from "../ui/Error";

const IndividualPost = () => {
  const { id } = useParams();
  const { fetchEachPost, isLoading, isError, title, body } = usePost();

  useEffect(() => {
    fetchEachPost(id);
  }, [id, fetchEachPost]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>Individual Post: {id}</h1>
          <h4>Title: {title}</h4>
          <p>Body: {body}</p>
        </>
      )}

      {isError && <Error message={isError} />}
    </div>
  );
};

export default IndividualPost;
