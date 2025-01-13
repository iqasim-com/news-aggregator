import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./navbar-styles.css";
import {DEFAULT_CONFIG} from "../../config/config.ts";
import {useUser} from "../../context/context.tsx";
import Modal from "../modal/modal.tsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, setUser, logout, filterData} = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  const handleSavePreferences = () => {
    if (user) {
      debugger;
      const updatedUser = {
        ...user,
        preferences: {
          authors: selectedAuthor
            ? Array.from(new Set([...user.preferences.authors, selectedAuthor]))
            : user.preferences.authors,
          categories: selectedCategory
            ? Array.from(new Set([...user.preferences.categories, selectedCategory]))
            : user.preferences.categories,
          sources: selectedSource
            ? Array.from(new Set([...user.preferences.sources, selectedSource]))
            : user.preferences.sources,
        },
      };

      // Update user in the state
      setUser(updatedUser);

      // Save updated user to localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsModalOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">{DEFAULT_CONFIG.shortAppName}</Link>
      </div>
      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li>
          <button onClick={() => setIsModalOpen(true)}>Feed Customization</button>
        </li>
        <li>
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/search" onClick={() => setIsOpen(false)}>
            Search
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={logout}>
            Logout
          </Link>
        </li>
        <li>
          <img src={user?.avatar} width="30" alt={user?.name || "User"}/>
        </li>
      </ul>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Feed Customization">
        <form>
          <div className="custom-select">
            <label htmlFor="authors">Select Author:</label>
            <select
              id="authors"
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
            >
              <option value="">-- Choose an Author --</option>
              {filterData.authors.map((author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>

          <div className="custom-select">
            <label htmlFor="categories">Select Category:</label>
            <select
              id="categories"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">-- Choose a Category --</option>
              {filterData.categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="custom-select">
            <label htmlFor="sources">Select Source:</label>
            <select
              id="sources"
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
            >
              <option value="">-- Choose a Source --</option>
              {filterData.sources.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          <button type="button" onClick={handleSavePreferences}>
            Save Preferences
          </button>
        </form>
      </Modal>
    </nav>
  );
};

export default Navbar;
