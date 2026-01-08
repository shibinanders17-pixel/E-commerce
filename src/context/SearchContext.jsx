import { createContext, useState } from "react";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
}
