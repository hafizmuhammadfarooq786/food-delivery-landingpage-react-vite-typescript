import { FoodResponse } from "../models/foodModels";

export function isNullOrEmpty(obj?: any | null | undefined) {
  return obj === null || typeof obj === "undefined" || !obj;
}

export function listContains<T>(value: T, list: T[]) {
  return list.indexOf(value) !== -1;
}

export function chunkArray(arr: any[], perChunk: number): any[][] {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
}

export function useDebounce(
  list: FoodResponse[],
  text: string,
  searchResults: Function,
  delay: number = 1000,
) {
  const timer = setTimeout(() => {
    const results: FoodResponse[] = list.filter((item: any) =>
      item.name.toLowerCase().trim().includes(text.toLowerCase().trim()),
    );
    searchResults(results);
  }, delay);
  return () => clearTimeout(timer);
}

export function findByCategory(list: FoodResponse[], categoryId: string) {
  const results: FoodResponse[] = list.filter(
    (item: any) => item.categoryId === categoryId,
  );
  return results;
}

export const fetchImage = async (
  imageUrl: string,
): Promise<string | boolean> => {
  try {
    const response = await fetch(imageUrl, { mode: "cors" });
    if (response.ok) {
      return imageUrl;
    } else {
      throw new Error("Image not found");
    }
  } catch (err) {
    return false;
  }
};
