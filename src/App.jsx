import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
        console.log(response.data);
        setFilteredPosts(response.data);
      } catch (err) {
        setError("Failed to fetch posts");
      }
    };
    fetch();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(term)
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Search posts by title..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      <div className="post-list">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.body}...</p>
            <button className="read-more">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
