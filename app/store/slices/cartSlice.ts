import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  uid: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  stock?: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const item = state.items.find((i) => i.uid === action.payload.uid);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.uid !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ uid: string; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.uid === action.payload.uid);

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.uid === action.payload);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.uid !== action.payload);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
