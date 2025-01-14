import React, { createContext, useState, useContext } from "react";
import {ArticleType, FilterDataType, UserContextType} from "./types.ts";

const UserContext = createContext<UserContextType>(null);

/**
 * UserProvider is a React context provider component that manages and supplies user-related state
 * and functionalities to its child components.
 *
 * This component handles the following states:
 * - `user`: Represents the currently logged-in user, initialized from localStorage, or set to null if unavailable.
 * - `articles`: An array of articles of type `ArticleType`.
 * - `filterData`: An object holding filtering criteria such as authors, categories, and sources, initialized as empty arrays.
 *
 * @param {object} props - Properties passed to the UserProvider component.
 * @param {React.ReactNode} props.children - The child elements to be wrapped by the context provider.
 * @returns {JSX.Element} A context provider with all user-related state and functions.
 */
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // `articles` should be an array of ArticleType
  const [articles, setArticles] = useState<ArticleType[]>([]);

  // `filterData` should be of type FilterDataType
  const [filterData, setFilterData] = useState<FilterDataType>({
    authors: [],
    categories: [],
    sources: [],
  });

  /**
   * Logs out the current user by updating their login status and clearing user-related data.
   *
   * This function updates the user state to reflect a logged-out status by:
   * - Setting the `isLoggedIn` property of the user object to false.
   * - Storing the updated user data in local storage with a unique key associated with the user's ID.
   * - Clearing the user state by setting it to null.
   */
  const logout = () => {
    const updatedUser = {
      ...user,
      isLoggedIn: false,
    };
    localStorage.setItem(`user${user.id}`, JSON.stringify(updatedUser));
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        articles,
        setArticles,
        filterData,
        setFilterData,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
