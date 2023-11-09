import {
  useAddPostMutation,
  useDeletePostMutation,
  usePostQuery,
  usePostsQuery,
  useUpdatePostMutation,
} from "./services/postsAPI";

function App() {
  const { data, isFetching, error, isLoading, isSuccess } = usePostsQuery();

  return (
    <div style={{ width: "100%" }}>
      <h1>React Redux Toolkit Query</h1>
      {isLoading && <h2>Loading...</h2>}
      {isFetching && <h2>Fetching...</h2>}
      {error && <h2>Error, Something went wrong</h2>}
      {isSuccess && (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            width: "90%",
            flexDirection: "column",
          }}
        >
          {data?.map((post) => {
            return (
              <div key={post.id} className="data">
                <span>{post.title}</span>
                <span>
                  <PostDetail id={post.id} />
                </span>
              </div>
            );
          })}
        </div>
      )}
      <div>
        <AddPost />
      </div>
    </div>
  );
}

export const PostDetail = ({ id }: { id: number }) => {
  const { data } = usePostQuery(id);
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

export const AddPost = () => {
  const [addPost] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const post = {
    id: 14,
    title: "LaPaFerrari",
    userId: 222,
    body: "unrevieled",
  };

  const updatedPost = {
    id: 14,
    title: "LaPaFerrari",
    userId: 222,
    body: "Super duper Car",
  };
  const addHandler = async () => {
    await addPost(post);
  };
  const updateHandler = async () => {
    await updatePost(updatedPost);
  };
  const deleteHandler = async () => {
    await deletePost(13);
  };

  return (
    <>
      <button onClick={addHandler}>Add Car</button>
      <button onClick={updateHandler}>Update Car</button>
      <button onClick={deleteHandler}>Delete Car</button>
    </>
  );
};

export default App;
