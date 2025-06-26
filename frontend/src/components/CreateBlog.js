import React, { useEffect, useState, useRef } from "react";
import { addBlog } from "../reducers/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import { motion } from "framer-motion";

const CreateBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const dispatch = useDispatch();
  const image = logo;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const Backend_image = process.env.REACT_APP_BACKEND_URI_BLOG;

  useEffect(() => {
    if (!token) {
      alert("Login first before creating blogs.");
      navigate("/login");
    }
  }, [user, navigate, token]);

  useEffect(() => {
    if (window.Quill && editorRef.current && !quillRef.current) {
      const quillInstance = new window.Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Start writing your blog...",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline"],
              [{ header: [1, 2, false] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"]
            ],
            handlers: {
              image: () => handleImageUpload(quillInstance)
            }
          }
        }
      });

      quillRef.current = quillInstance;

      quillRef.current.on("text-change", () => {
        setContent(quillRef.current.root.innerHTML);
      });
    } // eslint-disable-next-line
  }, []);

  const handleImageUpload = async (quill) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await fetch(`${Backend_image}/api/upload`, {
            method: "POST",
            body: formData
          });
          const data = await response.json();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", data.imageUrl);
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    };
  };

  const handleImage = () => {
    navigate("/blogs");
  };

  const handleCreate = async () => {
    const strippedContent = quillRef.current?.getText()?.trim();

    if (!title.trim()) {
      alert("Title cannot be empty.");
      return;
    }

    if (!strippedContent) {
      alert("Content cannot be empty.");
      return;
    }

    try {
      await dispatch(addBlog({ title, content, tags, author: user }));
      setTitle("");
      setContent("");
      setTags("");
      quillRef.current?.setContents([]);
      navigate("/blogs");
    } catch (err) {
      console.error("Error in Creating Blog", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4">
      <img
        src={image}
        className="absolute top-0 left-0 w-20 h-20 m-8 sm:ml-16 rounded-full transition ease-in-out delay-200 hover:animate-bounce cursor-pointer"
        alt="logo"
        onClick={handleImage}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-11/12 max-w-6xl px-10 py-10 mt-32 mb-14"
      >
        <h2 className="text-center text-4xl font-extrabold text-slate-900 underline underline-offset-4 hover:animate-pulse mb-10">
          Create a New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-800 font-semibold text-lg mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write your title here..."
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-slate-800 font-semibold text-lg mb-2">Content</label>
            <div
              ref={editorRef}
              className="bg-white border-2 border-slate-300 rounded-xl"
              style={{ height: "300px" }}
            />
          </div>

          <div>
            <label className="block text-slate-800 font-semibold text-lg mb-2">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add some tags..."
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-700 to-teal-900 hover:from-teal-800 hover:to-teal-950 text-white text-lg font-bold py-3 rounded-xl transition duration-300 hover:scale-105 hover:animate-pulse"
          >
            Create Blog
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateBlog;