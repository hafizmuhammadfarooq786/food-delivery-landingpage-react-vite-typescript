import { ApiEndPoints } from "../constants/apiEndPointConstants";
import { getApiHandler } from "./ApiFactory";
import { CategoriesResponse, FoodResponse } from "../models/foodModels";

export const getFoodCategories = async (): Promise<CategoriesResponse[]> => {
  const categories: CategoriesResponse[] = await getApiHandler().get(
    ApiEndPoints.FOOD_CATEGORIES,
  );
  return categories;
};

export const getFoodList = async (): Promise<FoodResponse[]> => {
  const data: any = await getApiHandler().get(ApiEndPoints.FOOD_LIST);
  return data.foods as FoodResponse[];
};
