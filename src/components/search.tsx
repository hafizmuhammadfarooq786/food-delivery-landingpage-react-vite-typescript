import React, { useState } from "react";
import { Text } from "../constants/appConstants";
import SearchIcon from "../assets/magnify.svg";
import CoseIcon from "../assets/close.svg";
import { useDebounce } from "../util/globalFunctions";
import { FoodResponse } from "../models/foodModels";

interface InputProps {
  foodItems: FoodResponse[];
  height?: number;
  width?: number;
  searchResults: (res: FoodResponse[]) => void;
  setSearchFlag: (status: boolean) => void;
}

const Search: React.FC<InputProps> = ({
  foodItems,
  height,
  width,
  searchResults,
  setSearchFlag,
}) => {
  // Set/Manage Search Input Value State
  const [searchText, setSearchText] = useState<string>("");
  // OnClick: Close Icon
  const handleClose = () => {
    setSearchText("");
    searchResults(foodItems.slice(0, 9));
    setSearchFlag(false);
  };

  return (
    <div className="search_box" style={{ height, width }}>
      <img src={SearchIcon} alt="search icon" height={32} width={32} />
      <input
        type="text"
        value={searchText}
        placeholder={Text.EnterRestaurantName}
        onChange={(e) => {
          setSearchText(e.target.value);
          setSearchFlag(true);
          if (e.target.value) {
            useDebounce(foodItems, e.target.value, searchResults);
          } else {
            searchResults(foodItems.slice(0, 9));
          }
        }}
      />
      {searchText !== "" && (
        <div className="close_button">
          <img
            src={CoseIcon}
            alt="search icon"
            height={24}
            width={24}
            onClick={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
