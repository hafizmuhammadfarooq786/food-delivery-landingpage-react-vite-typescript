import { Colors } from "./colorConstants";

export const Text = {
  Empty: "",
  ShowMore: "Show More",
  EnterRestaurantName: "Enter restaurant name",
  Apply: "Apply",
  Cancel: "Cancel",
};

export enum ButtonStatus {
  Active = "Active",
  Inactive = "InActive",
}

export const GetButtonStatus = (isTrue: boolean) =>
  isTrue ? ButtonStatus.Active : ButtonStatus.Inactive;

export enum Promotions {
  Gift = "gift",
  OnePlusOne = "1+1",
  Discount = "discount",
}

export const getPromotionBg = (promotion: Promotions) => {
  switch (promotion) {
    case Promotions.Gift:
      return Colors.Blue;
    case Promotions.OnePlusOne:
      return Colors.Purple;
    case Promotions.Discount:
      return Colors.Red;
    default:
      return "transparent";
  }
};
