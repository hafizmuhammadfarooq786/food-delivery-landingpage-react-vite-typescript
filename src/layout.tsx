// Layout.tsx
import React from "react";
import Search from "./components/search";
import Categories from "./components/categories";
import ProductCard from "./components/common/card";
import Button from "./components/common/button";
import Empty from "./components/common/empty";
import Loader from "./components/common/loader";
import { Text, ButtonStatus } from "./constants/appConstants";
import { Colors } from "./constants/colorConstants";
import PlusIcon from "./assets/plus.svg";
import { FoodResponse } from "./models/foodModels";

interface LayoutProps {
  loading: boolean;
  searchFlag: boolean;
  categories: any[];
  foodItems: FoodResponse[];
  visibleItems: FoodResponse[];
  trackItem: FoodResponse[];
  handleShowMore: () => void;
  setSearchFlag: (status: boolean) => void;
  handleChange: (items: FoodResponse[]) => void;
}

const Layout: React.FC<LayoutProps> = ({
  loading,
  searchFlag,
  categories,
  foodItems,
  visibleItems,
  trackItem,
  handleShowMore,
  handleChange,
  setSearchFlag,
}) => {
  return !loading ? (
    <div className="container">
      <Search
        foodItems={foodItems}
        setSearchFlag={setSearchFlag}
        searchResults={(result: FoodResponse[]) => handleChange(result)}
      />
      {categories.length && (
        <Categories
          categories={categories}
          foodItems={foodItems}
          searchFlag={searchFlag}
          handleClick={(result: FoodResponse[]) => handleChange(result)}
        />
      )}
      <div className="gridBox">
        {visibleItems.length ? (
          visibleItems.map((source: FoodResponse, index: number) => (
            <ProductCard key={index} {...source} />
          ))
        ) : (
          <Empty />
        )}
      </div>
      {visibleItems.length < trackItem.length && (
        <div className="row justifyCenter">
          <Button
            buttonText={Text.ShowMore}
            buttonStatus={ButtonStatus.Active}
            handleClick={handleShowMore}
            icon={PlusIcon}
            border={true}
            borderRadius={12}
            borderWidth={2}
            borderStyle="solid"
            borderColor={Colors.Yellow}
          />
        </div>
      )}
    </div>
  ) : (
    <div className="loading_screen">
      <Loader color={Colors.Black} secondaryColor={Colors.Slate} />
      <p>Loading, please wait...</p>
    </div>
  );
};

export default Layout;
