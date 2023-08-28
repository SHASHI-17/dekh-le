import React, { useState } from "react";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";

function Comment() {
  const params = useParams();

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchComments() {
    setLoading(true);
    try {
      const responseOfPost = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.postId}`
      );
      const responseOfComments = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${params.postId}`
      );
      const dataOfPost = await responseOfPost.json();
      const dataOfComments = await responseOfComments.json();

      console.log(dataOfComments);

      setComments(dataOfComments);
      setPost(dataOfPost);
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  }

  useState(() => {
    fetchComments();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#23242a] text-white">
      <Navbar />
      <div className="w-10/12 mx-auto px-4 py-8">
        {loading ? (
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <Loader />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center">
            <p className="text-3xl font-mono animate-ping">No Comments Found</p>
          </div>
        ) : (
          <>
            <h1 className="cursor-pointer text-[#00df9a] mb-5" onClick={() => navigate(-1)}>
              Back
            </h1>
            <div className="mb-4">
              <h1 className="text-3xl font-bold">Post</h1>
              <h2 className="text-[#00df9a]">{post.title}</h2>
              <h2 className="mb-2 text-gray-500 font-bold">{post.body}</h2>
            </div>

            <div>
              <h1 className="text-3xl text-center p-4 mb-4">Comments</h1>
              {comments.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border rounded-lg overflow-hidden gap-2 p-6 hover:scale-105 hover:backdrop-blur-md transition-transform duration-500 ring-2 ring-green-500 md:ring-2 md:ring-green-500 hover:ring-4 md:hover:ring-4 hover:shadow-xl md:hover:shadow-2xl"
                    >
                      <h1 className="mb-2 font-bold">Name: {comment.name}</h1>
                      <h2 className="text-[#00df9a]">Email: {comment.email}</h2>
                      <h3 className="mb-2 text-gray-500 font-bold">
                        {comment.body}
                      </h3>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

    </div>
  );
}

export default Comment;
