import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateBlog } from "../reducers/blogSlice";
import LoadingSpinner from "./LoadSpinner";
import { motion } from "framer-motion";

const Backend_blog = process.env.REACT_APP_BACKEND_URI_BLOG;

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${Backend_blog}/blog/${id}`);
        const data = response.data;

        setTitle(data.title || "");
        setTags(data.tags || "");
        setContent(data.content || "");

        if (quillRef.current) {
          quillRef.current.root.innerHTML = data.content || "";
        }
      } catch (err) {
        console.error("Error fetching blog data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (window.Quill && editorRef.current && !quillRef.current) {
      const quillInstance = new window.Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Edit your blog content...",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline"],
              [{ header: [1, 2, false] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
            ],
            handlers: {
              image: () => handleImageUpload(quillInstance),
            },
          },
        },
      });

      quillRef.current = quillInstance;

      if (content) {
        quillRef.current.root.innerHTML = content;
      }

      quillRef.current.on("text-change", () => {
        setContent(quillRef.current.root.innerHTML);
      });
    }
  }, [content]);

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
          const response = await fetch(`${Backend_blog}/api/upload`, {
            method: "POST",
            body: formData,
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

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title cannot be empty.");
      return;
    }
    if (!content || content === "<p><br></p>") {
      alert("Content cannot be empty.");
      return;
    }

    setSubmitting(true);

    dispatch(updateBlog({ id, title, content, tags }))
      .unwrap()
      .then(() => {
        alert("Blog updated successfully!");
        navigate(`/blog/${id}`);
      })
      .catch((err) => {
        console.error("Error updating blog:", err);
        alert("Failed to update blog.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (loading || submitting) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto"
    >
      <div className="bg-slate-100 opacity-95 rounded-3xl p-8 m-6 sm:m-24">
        <h2 className="p-2 m-2 text-3xl sm:text-4xl text-center font-bold text-amber-800 underline underline-offset-4 hover:animate-pulse">
          <b>Update Blog</b>
        </h2>
        <form onSubmit={handleUpdate}>
          <div>
            <label className="text-xl font-semibold p-2 font-bold underline underline-offset-4" htmlFor="title">
              Title:
            </label>
            <input
              className="hover:transition ease-in-out bg-gray-800 hover:bg-gray-950 rounded-3xl m-2 sm:m-4 text-slate-100 w-full p-4"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xl font-semibold p-2 font-bold underline underline-offset-4" htmlFor="content">
              Content:
            </label>
            <div
              ref={editorRef}
              className="bg-white border-4 border-slate-950 rounded-3xl m-4"
              style={{ height: "300px" }}
            />
          </div>

          <div>
            <label className="text-xl font-semibold p-2 font-bold underline underline-offset-4" htmlFor="tags">
              Tags:
            </label>
            <input
              className="hover:transition ease-in-out bg-gray-800 hover:bg-gray-950 rounded-3xl m-4 text-slate-100 w-full p-4"
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="transition ease-in-out delay-150 text-slate-100 font-semibold p-4 m-4 bg-amber-600 hover:bg-amber-800 hover:-translate-y-1 duration-300 hover:scale-110 rounded-2xl hover:animate-pulse"
          >
            Update Blog
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Update;
