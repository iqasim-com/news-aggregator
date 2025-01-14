import React, {createContext, useState, useContext} from "react";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  // TODO: Fix user dynamically here
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [articles, setArticles] = useState([]); // State for articles
  const [filterData, setFilterData] = useState(
    {
      authors: [],
      categories: [],
      sources: []
    })

  // Logout function
  const logout = () => {
    const updatedUser = {
      ...user,
      isLoggedIn: false,
    };
    localStorage.setItem(`user${user.id}`, JSON.stringify(updatedUser));
    setUser(null); // Reset user in context
  };

  return (
    <UserContext.Provider value={{user, setUser, articles, setArticles, filterData, setFilterData, logout}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
