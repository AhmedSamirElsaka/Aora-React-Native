import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext({});
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user) {
          setIsLoggedIn(true);
          setUser(user);
        } else {
          setIsLoading(false);
          setUser(null);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setUser(null);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
