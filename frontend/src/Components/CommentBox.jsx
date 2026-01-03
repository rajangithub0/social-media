import { useState } from "react";
import API from "../Api";

function CommentBox({ postId }) {
  const [text, setText] = useState("");

  const submitComment = async () => {
    try {
      await API.post(`/api/posts/${postId}/comments`, {
        text,
      });
      setText("");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={submitComment}>Comment</button>
    </div>
  );
}

export default CommentBox;
