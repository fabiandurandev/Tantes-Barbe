import type { ProductType } from "../types";
import { create } from "zustand";

type ProductsStore = {
  products: ProductType[];
  add: (product: ProductType) => void;
  remove: (codigo: number, index: number) => void;
  quantity: number[];
  addQuantity: (index: number, product: ProductType) => void;
  subtractQuantity: (i: number) => void;
};

const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  add: (product) =>
    set((state) => ({ products: [product, ...state.products] })),
  remove: (codigo, index) =>
    set((state) => ({
      products: state.products.filter(
        (product) => product.codigoProducto !== codigo
      ),
      quantity: [
        ...state.quantity.slice(0, index),
        ...state.quantity.slice(index + 1),
      ],
    })),
  quantity: [],
  addQuantity: (i, product) =>
    set((state) => ({
      quantity: state.quantity.map((q, index) =>
        i === index && q < product.stock ? q + 1 : q
      ),
    })),
  subtractQuantity: (i) =>
    set((state) => ({
      quantity: state.quantity.map((q, index) =>
        i == index ? (q > 1 ? q - 1 : q) : q
      ),
    })),
}));

export default useProductsStore;
