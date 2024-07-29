import React, { useEffect, useState } from "react";
import FilterIcon from "../assets/filter.svg";
import CoseIcon from "../assets/close.svg";
import { ButtonStatus, Text } from "../constants/appConstants";
import { Colors } from "../constants/colorConstants";
import Button from "./common/button";
import { CategoriesResponse, FoodResponse } from "../models/foodModels";
import { findByCategory } from "../util/globalFunctions";

interface Props {
  categories: CategoriesResponse[];
  foodItems: FoodResponse[];
  handleClick: (response: FoodResponse[]) => void;
  searchFlag: boolean;
}

const Categories: React.FC<Props> = ({
  categories,
  foodItems,
  handleClick,
  searchFlag,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesResponse | null>(categories[0]);
  const isSelected = (category: CategoriesResponse) => {
    if (selectedCategory) {
      return category.name === selectedCategory.name;
    } else {
      return false;
    }
  };
  const [modal, showModal] = useState<boolean>(false);

  const handleModalClick = () => showModal((prevState) => !prevState);

  // OnClick => Category tile, set searched results based on selected category
  const handleCategoryResults = (
    category: CategoriesResponse,
  ): FoodResponse[] => {
    if (category.name === "all") {
      return foodItems;
    } else {
      return findByCategory(foodItems, category.id);
    }
  };

  useEffect(() => {
    if (searchFlag) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categories[0]);
    }
  }, [searchFlag]);

  return (
    <div className="row">
      {/* Desktop */}
      <div className="categories">
        {categories.map((category: CategoriesResponse, index: number) => (
          <p
            className={isSelected(category) ? "selected" : ""}
            onClick={() => {
              setSelectedCategory(category);
              handleClick(handleCategoryResults(category));
            }}
            key={index}
          >
            {category.name}
          </p>
        ))}
      </div>
      {/* Mobile */}
      <div className="mobile_view">
        <div className="filter_icon">
          <img
            src={FilterIcon}
            alt="filter icon"
            height={24}
            width={24}
            onClick={handleModalClick}
          />
        </div>
        {modal && (
          <div className="modal">
            <div className="row">
              <h4>Categories</h4>
              <img
                src={CoseIcon}
                alt="close icon"
                height={24}
                width={24}
                onClick={handleModalClick}
              />
            </div>

            <div className="column">
              {categories.map((category: CategoriesResponse, index: number) => (
                <div className="category">
                  <input
                    type="radio"
                    id={category.name}
                    name={category.name}
                    checked={isSelected(category) ? true : false}
                    onClick={() => {
                      setSelectedCategory(category);
                    }}
                    value={category.name}
                    key={index}
                  />
                  <label htmlFor={category.name}>{category.name}</label>
                </div>
              ))}
            </div>
            <div className="filter_buttons">
              <Button
                buttonText={Text.Apply}
                buttonStatus={ButtonStatus.Active}
                handleClick={() => {
                  if (selectedCategory) {
                    handleModalClick();
                    handleClick(handleCategoryResults(selectedCategory));
                  }
                }}
                width="100%"
                border={true}
                borderRadius={12}
                borderWidth={2}
                borderStyle="solid"
                borderColor={Colors.Yellow}
              />
              <Button
                buttonText={Text.Cancel}
                buttonStatus={ButtonStatus.Active}
                handleClick={handleModalClick}
                width="100%"
                border={true}
                borderRadius={12}
                borderWidth={2}
                borderStyle="solid"
                borderColor={Colors.Slate}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
