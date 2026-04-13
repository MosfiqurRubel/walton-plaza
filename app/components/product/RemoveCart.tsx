"use client";

import { useAppDispatch } from "@/app/store/hooks";
import { decreaseQuantity } from "@/app/store/slices/cartSlice";
import Button from "@/app/components/ui/Button";
import { Trash } from "lucide-react";

type Props = {
  uid: string;
};

const RemoveCart = ({ uid }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      override
      className="cursor-pointer text-red-600"
      icon={<Trash className="hover:text-red-700" />}
      onClick={() => dispatch(decreaseQuantity(uid))}
    />
  );
};

export default RemoveCart;
