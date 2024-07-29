import React, { useEffect, useState } from "react";
import { ButtonStatus, Text } from "./constants/appConstants";
import { Colors } from "./constants/colorConstants";
import Categories from "./components/categories";
import ProductCard from "./components/common/card";
import Button from "./components/common/button";
import { CategoriesResponse, FoodResponse } from "./models/foodModels";
import Search from "./components/search";
import Empty from "./components/common/empty";
import { getFoodCategories, getFoodList } from "./services/Api";
import PlusIcon from "./assets/plus.svg";
import Loader from "./components/common/loader";

const App: React.FC = React.memo(() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<any>([]);
  const [foodItems, setFoodItems] = useState<any>([]);
  const [trackItem, setTrackItems] = useState<any>([]);
  const [visibleItems, setVisibleItems] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 9;

  // Funations
  // onClick => Show More Button
  const handleShowMore = () => {
    const nextPage = page + 1;
    const newVisibleItems = trackItem.slice(0, nextPage * itemsPerPage);
    setVisibleItems(newVisibleItems);
    setPage(nextPage);
  };

  // Function to handle category selection or search
  const handleChange = (items: FoodResponse[]) => {
    setTrackItems(items);
    setPage(1);
    setVisibleItems(items.slice(0, itemsPerPage));
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoryResults: CategoriesResponse[] = await getFoodCategories();
      if (categoryResults.length) {
        categoryResults.unshift({
          id: "",
          name: "all",
        });
        setCategories(categoryResults);
      }
      const foodResults: FoodResponse[] = await getFoodList();
      setFoodItems(foodResults);
      setTrackItems(foodResults);
      setVisibleItems(foodResults.slice(0, itemsPerPage));
      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, []);

  return !loading ? (
    <div className="container">
      {/* Search */}
      <Search
        foodItems={foodItems}
        searchResults={(result: FoodResponse[]) => handleChange(result)}
      />
      {/* Categories */}
      {categories.length && (
        <Categories
          categories={categories}
          foodItems={foodItems}
          handleClick={(result: FoodResponse[]) => handleChange(result)}
        />
      )}

      {/* GridBox containing product cards */}
      <div className="gridBox">
        {visibleItems.length ? (
          visibleItems.map((source: FoodResponse, index: number) => (
            <ProductCard key={index} {...source} />
          ))
        ) : (
          <Empty />
        )}
      </div>

      {/* Show More Button */}
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
});

export default App;
