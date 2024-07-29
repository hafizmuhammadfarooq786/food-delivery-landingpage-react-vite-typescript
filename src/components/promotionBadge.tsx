import { getPromotionBg, Promotions } from "../constants/appConstants";

interface PromotionProps {
  value: Promotions;
}

const PromotionBadge: React.FC<PromotionProps> = ({ value }) => {
  const promotionBg = getPromotionBg(value);
  return (
    <div className="promotion_bucket" style={{ backgroundColor: promotionBg }}>
      <p>{value}</p>
    </div>
  );
};

export default PromotionBadge;
