import { useContext, createContext, useState } from "react";
import { themes } from "./variables";

//the variables you want to provide to all the pages/components wrapped around this provider
const initialStates = {
  theme: "light",
  setTheme: () => {},
  fav: {},
  setFav: () => {},
};

const MyContext = createContext(initialStates);

export default function AppProvider({ children }) {
  const [theme, setTheme] = useState(initialStates.theme);
  const [fav, setFav] = useState({});

  return (
    <MyContext.Provider
      value={{ theme, setTheme, fav, setFav }}
    >
      <style jsx global>
        {`
          body {
            background-color: ${themes[theme].body};
          }
        `}
      </style>
      {children}
    </MyContext.Provider>
  );
}

//use the Context to create Hooks like useTheme

export function useTheme() {
  const { theme, setTheme } = useContext(MyContext);
  return { theme, setTheme };
}

// 3/14/22 =====
export function useFav() {
  const { fav, setFav } = useContext(MyContext);
  return { fav, setFav };
}
