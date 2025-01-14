import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar-styles.css";
import { DEFAULT_CONFIG } from "../../config/config.ts";
import { useUser } from "../../context/context.tsx";
import Modal from "../modal/modal.tsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, logout, filterData } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const handleSavePreferences = () => {
    if (user) {
      const updatedUser = {
        ...user,
        preferences: {
          authors: selectedAuthors.length ? selectedAuthors : user.preferences.authors,
          categories: selectedCategories.length ? selectedCategories : user.preferences.categories,
          sources: selectedSources.length ? selectedSources : user.preferences.sources,
        },
      };

      setUser(updatedUser);

      localStorage.setItem(`user${user.id}`, JSON.stringify(updatedUser));
      setIsModalOpen(false);
    }
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setter(options);
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
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/search" onClick={() => setIsOpen(false)}>Search</Link>
        </li>
        <li>
          <Link to="/login" onClick={logout}>Logout</Link>
        </li>
        <li>
          <img src={user?.avatar} width="30" alt={user?.name || "User"} />
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
            <label htmlFor="authors">Select Authors:</label>
            <select
              id="authors"
              multiple
              value={selectedAuthors}
              onChange={(e) => handleMultiSelectChange(e, setSelectedAuthors)}
            >
              {filterData.authors.map((author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>

          <div className="custom-select">
            <label htmlFor="categories">Select Categories:</label>
            <select
              id="categories"
              multiple
              value={selectedCategories}
              onChange={(e) => handleMultiSelectChange(e, setSelectedCategories)}
            >
              {filterData.categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="custom-select">
            <label htmlFor="sources">Select Sources:</label>
            <select
              id="sources"
              multiple
              value={selectedSources}
              onChange={(e) => handleMultiSelectChange(e, setSelectedSources)}
            >
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
