import React, {ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";
import "./navbar-styles.css";
import {DEFAULT_CONFIG} from "../../config/config.ts";
import {useUser} from "../../context/context.tsx";
import Modal from "../modal/modal.tsx";
import SelectableList from "../selectableList/SelectableList.tsx";
import {PREFERENCE_TYPES} from "../../config/constants.ts";
import Button from "../button/button.tsx";
import ListItem from "../listItem/listItem.tsx";

/**
 * Navbar component responsible for rendering the navigation bar.
 *
 * Returns:
 * - JSX to render the navigation bar, including the logo, navigation links, and the feed customization modal.
 */
const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState({
    authors: [] as string[],
    categories: [] as string[],
    sources: [] as string[],
  });
  // @ts-expect-error/ban-app-build
  const {user, setUser, logout, filterData} = useUser();
  const handleNavbarToggle = () => setIsNavbarOpen((prev) => !prev);
  const handleModalClose = () => setIsModalOpen(false);

  /**
   * Handles the change event for a selectable HTML element, such as a `<select>` with multiple options.
   * Updates the state with the selected values for the specific type.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event triggered by the selectable element.
   * @param {string} type - The category or key to update within the preferences state.
   */
  const handleSelectableChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: string
  ) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedPreferences((prev) => ({
      ...prev,
      [type]: selectedOptions,
    }));
  };

  /**
   * Updates and saves user preferences based on selected preferences.
   *
   * The function checks if a user exists and then updates their preferences
   * (authors, categories, and sources) by prioritizing the selectedPreferences.
   * If no selected preferences are provided in a category, the existing user
   * preferences are retained. The updated preferences are saved to both
   * the local state via the `setUser` function and local storage.
   * Finally, the associated modal is closed by invoking `handleModalClose`.
   */
  const handleSavePreferences = () => {
    if (user) {
      const updatedPreferences = {
        authors: selectedPreferences.authors.length
          ? selectedPreferences.authors
          : user.preferences.authors,
        categories: selectedPreferences.categories.length
          ? selectedPreferences.categories
          : user.preferences.categories,
        sources: selectedPreferences.sources.length
          ? selectedPreferences.sources
          : user.preferences.sources,
      };

      const updatedUser = {...user, preferences: updatedPreferences};
      setUser(updatedUser);
      localStorage.setItem(`user${user.id}`, JSON.stringify(updatedUser));
      handleModalClose();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">{DEFAULT_CONFIG.shortAppName}</Link>
      </div>
      <ul className={`navbar-links ${isNavbarOpen ? "active" : ""}`}>
        <ListItem>
          <Button onClick={() => setIsModalOpen(true)}>Personalize news feed</Button>
        </ListItem>
        <ListItem>
          <Link to="/dashboard" onClick={() => setIsNavbarOpen(false)}>
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/search" onClick={() => setIsNavbarOpen(false)}>
            Search
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/login" onClick={logout}>Logout</Link>
        </ListItem>
        <ListItem>
          <img src={user?.avatar} width="30" alt={user?.name || "User"}/>
        </ListItem>
      </ul>
      <div className="navbar-toggle" onClick={handleNavbarToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Personalized Feed">
        <form className="py-4">
          <div className="mb-4">
            <div className="mb-3">
              <SelectableList
                label="Select Authors"
                id={PREFERENCE_TYPES.AUTHORS}
                options={filterData.authors}
                value={selectedPreferences.authors}
                onChange={(e: ChangeEvent<HTMLSelectElement>): void => handleSelectableChange(e, PREFERENCE_TYPES.AUTHORS)}
              />
            </div>
            <div className="mb-3">
              <SelectableList
                label="Select Categories"
                id={PREFERENCE_TYPES.CATEGORIES}
                options={filterData.categories}
                value={selectedPreferences.categories}
                onChange={(e: ChangeEvent<HTMLSelectElement>): void => handleSelectableChange(e, PREFERENCE_TYPES.CATEGORIES)}
              />
            </div>
            <div className="mb-3">
              <SelectableList
                label="Select Sources"
                id={PREFERENCE_TYPES.SOURCES}
                options={filterData.sources}
                value={selectedPreferences.sources}
                onChange={(e: ChangeEvent<HTMLSelectElement>): void => handleSelectableChange(e, PREFERENCE_TYPES.SOURCES)}
              />
            </div>
          </div>
          <Button type="button" onClick={handleSavePreferences}>
            Save Preferences
          </Button>
        </form>
      </Modal>
    </nav>
  );
};

export default Navbar;
