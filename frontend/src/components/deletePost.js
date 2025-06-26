import { useEffect, useState } from "react";
import { deleteBlog } from '../reducers/blogSlice';
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from './LoadSpinner';

const Delete = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deleteAndRedirect = async () => {
      try {
        setLoading(true);
        await dispatch(deleteBlog(id));
        setLoading(false);
        alert("Post deleted successfully");
        navigate('/blogs');
      } catch (error) {
        setLoading(false);
        alert("Error deleting post");
        console.error("Error deleting blog:", error);
        navigate('/blogs');
      }
    };

    deleteAndRedirect();
  }, [dispatch, navigate, id]);

  if (loading) return <LoadingSpinner />;

  // No UI to show because we redirect immediately after delete
  return null;
};

export default Delete;
