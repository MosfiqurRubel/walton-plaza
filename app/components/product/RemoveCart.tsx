import { useDispatch } from "react-redux";
import { decreaseQuantity, removeFromCart } from "@/app/store/slices/cartSlice";
import Button from "@/app/components/ui/Button";

type Props = {
  uid: string;
};

const RemoveCart: React.FC<Props> = ({ uid }) => {
  const dispatch = useDispatch();

  return (
    <Button
      variant="danger"
      label="Delete"
      onClick={() => dispatch(decreaseQuantity(uid))}
    />
  );
};

export default RemoveCart;
