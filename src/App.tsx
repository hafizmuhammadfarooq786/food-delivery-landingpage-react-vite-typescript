// App.tsx
import React, { useEffect, useState } from "react";
import { CategoriesResponse, FoodResponse } from "./models/foodModels";
import { getFoodCategories, getFoodList } from "./services/Api";
import Layout from "./layout";

const App: React.FC = React.memo(() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchFlag, setSearchFlag] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [trackItem, setTrackItems] = useState<any[]>([]);
  const [visibleItems, setVisibleItems] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 9;

  const handleShowMore = () => {
    const nextPage = page + 1;
    const newVisibleItems = trackItem.slice(0, nextPage * itemsPerPage);
    setVisibleItems(newVisibleItems);
    setPage(nextPage);
  };

  const handleChange = (items: FoodResponse[]) => {
    setTrackItems(items);
    setPage(1);
    setVisibleItems(items.slice(0, itemsPerPage));
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoryResults: CategoriesResponse[] = await getFoodCategories();
      if (categoryResults.length) {
        categoryResults.unshift({ id: "", name: "all" });
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

  return (
    <Layout
      loading={loading}
      searchFlag={searchFlag}
      categories={categories}
      foodItems={foodItems}
      visibleItems={visibleItems}
      trackItem={trackItem}
      handleShowMore={handleShowMore}
      handleChange={handleChange}
      setSearchFlag={setSearchFlag}
    />
  );
});

export default App;
