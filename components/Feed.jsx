"use client"
import { useState, useEffect } from "react";
import PromptCardList from "./PromptCard";

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]); // Store all posts fetched from API
  const [filteredPosts, setFilteredPosts] = useState([]); // Store filtered posts based on search

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setAllPosts(data);
        setFilteredPosts(data); // Initialize filtered posts with all posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const lowerCaseSearchText = searchText.toLowerCase();

    // Filter posts based on search criteria
    const filtered = allPosts.filter((post) =>
      post.prompt.toLowerCase().includes(lowerCaseSearchText)
    );

    setFilteredPosts(filtered); // Update filtered posts state
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      <form onSubmit={handleSearchSubmit} className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search For Prompts..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
        <button type="submit" className="black_btn mx-2">Search</button>
      </form>

      <div className="mt-16 prompt_layout">
        {filteredPosts.map((post) => (
          <PromptCardList
            key={post._id}
            post={post}
            handleTagClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
}

export default Feed;
