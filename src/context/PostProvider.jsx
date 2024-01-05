import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const PostContext = createContext();
const BASE_URL = "https://jsonplaceholder.typicode.com/posts/";

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAllPost() {
      setIsLoading(true);
      setIsError("");

      try {
        const res = await fetch(`${BASE_URL}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Something wrong!");
        }

        const data = await res.json();

        setIsLoading(false);
        setPosts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setIsLoading(false);
          setIsError(error.message);
        }
      }
    }

    fetchAllPost();

    return () => {
      controller.abort();
    };
  }, []);

  const fetchEachPost = useCallback(async (postId) => {
    setIsLoading(true);
    setIsError("");

    try {
      const res = await fetch(`${BASE_URL}${postId}`);
      if (!res.ok) {
        throw new Error("Something wrong!");
      }

      const data = await res.json();

      setIsLoading(false);
      setTitle(data.title);
      setBody(data.body);
    } catch (error) {
      setIsLoading(false);
      setIsError(error.message);
    }
  }, []);

  // async function fetchEachPost(postId) {
  //   setIsLoading(true);
  //   setIsError("");

  //   try {
  //     const res = await fetch(`${BASE_URL}${postId}`);
  //     if (!res.ok) {
  //       throw new Error("Something wrong!");
  //     }

  //     const data = await res.json();

  //     setIsLoading(false);
  //     setTitle(data.title);
  //     setBody(data.body);
  //   } catch (error) {
  //     setIsLoading(false);
  //     setIsError(error.message);
  //   }
  // }

  return (
    <PostContext.Provider
      value={{
        posts,
        isLoading,
        isError,
        fetchEachPost,
        title,
        body,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

function usePost() {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error("PostContext is outside of PostProvider!");
  }

  return context;
}

export { PostProvider, usePost };
