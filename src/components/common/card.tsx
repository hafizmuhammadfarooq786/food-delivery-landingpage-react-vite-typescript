import React, { useEffect, useState } from "react";
import StarIcon from "../../assets/star.svg";
import { Colors } from "../../constants/colorConstants";
import { FoodResponse } from "../../models/foodModels";
import { fetchImage } from "../../util/globalFunctions";
import ImageNotFound from "../../assets/imageNotFound.png";
import PromotionBadge from "../promotionBadge";
import { Promotions } from "../../constants/appConstants";

const Card: React.FC<FoodResponse> = ({
  id,
  rating,
  minCookTime,
  maxCookTime,
  isNew,
  promotion,
  name,
  imageUrl,
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImageSource = async () => {
      const response = await fetchImage(imageUrl);
      if (typeof response === "boolean") {
        setError(true);
      }
    };
    fetchImageSource();
  }, [imageUrl]);

  const isValidPromotion = (value: any): value is Promotions =>
    Object.values(Promotions).includes(value);

  return (
    <div className="card" key={id}>
      {promotion && isValidPromotion(promotion) && (
        <PromotionBadge value={promotion} />
      )}
      <img
        src={error ? ImageNotFound : imageUrl}
        loading="lazy"
        alt={`${name} - banner`}
        height="auto"
        width={320}
      />
      <div className="box">
        <h4>{name}</h4>
        <div className="row">
          <div className="slate_box">
            <p>
              <span>
                <img
                  src={StarIcon}
                  loading="lazy"
                  alt="start icon"
                  height={16}
                  width={16}
                />
              </span>
              {rating.toFixed(1)}
            </p>
          </div>
          <div className="slate_box">
            <p>
              {minCookTime} - {maxCookTime} min
            </p>
          </div>
          {isNew && (
            <div className="slate_box">
              <p style={{ color: Colors.Green, fontWeight: 600 }}>New</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
