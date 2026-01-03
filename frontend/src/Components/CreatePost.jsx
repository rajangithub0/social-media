import { useState } from "react";
import API from "../Api";
import "../index.css";

function CreatePost() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      await API.post("/api/posts", formData);
      setCaption("");
      setImage(null);
      window.location.reload(); // simple refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Create Post
        </h2>
        <input
          className="bg-white p-8 rounded-2xl shadow-2xl  flex flex-col gap-4 hover:shadow-pink-700"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <input
         className="border border-gray-300 rounded-lg px-3 mr-6 py-2 pr-5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <button
           className="mt-2  pl-5 pr-5 bg-linear-120 from-pink-500 to-red-500 text-white font-semibold py-2 rounded-xl hover:opacity-90 active:scale-95 transition"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
