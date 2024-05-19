import {useEffect} from "react";
import {deleteBlog} from '../reducers/blogSlice';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Delete = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(id);

    useEffect(() => {
        const deleteAndRedirect = async () => {
            try {
                // Dispatch the deleteBlog action and wait for it to complete
                await dispatch(deleteBlog(id));
                
                // Redirect after successful deletion
                navigate('/blogs');
            } catch (error) {
                // Handle any errors, such as network errors or errors in the deletion process
                console.error("Error deleting blog:", error);
            }
        };

        deleteAndRedirect(); // Call the function when the component mounts
    }, [dispatch, navigate, id]); // Ensure dependencies are included in the dependency array

    // This component doesn't render anything, so you might want to return null
    return null;
}
    
export default Delete;