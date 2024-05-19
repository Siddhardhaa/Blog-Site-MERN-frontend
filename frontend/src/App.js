import './index.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import CreateBlog from './components/CreateBlog';
import SingleBlog from './components/SingleBlog';
import Login from './components/Login';
import Update from './components/Update';
import Delete from './components/deletePost';
import Register from './components/Register';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/create-post" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/u/:id" element={<Update />} />
        <Route path="/blog/d/:id" element={<Delete />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};
export default App;