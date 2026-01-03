import { useEffect, useState } from "react";
import API from "../Api";
import CommentBox from "./CommentBox";

function PostFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <img src={post.imageUrl} width="300" />
          <p>{post.caption}</p>

          {post.comments.map((c, i) => (
            <p key={i}>💬 {c}</p>
          ))}

          <CommentBox postId={post._id} />
        </div>
      ))}
    </div>
  );
}

export default PostFeed;
