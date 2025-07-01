import type { ClientType, ProductType, ServiceType } from "../types";
import { create } from "zustand";

type ProductsStore = {
  products: ProductType[];
  add: (product: ProductType) => void;
  remove: (codigo: number, index: number) => void;
  quantity: number[];
  addQuantity: (index: number, product: ProductType) => void;
  subtractQuantity: (i: number) => void;
  resetSale: () => void;
};

type ServicesStore = {
  services: ServiceType[];
  add: (service: ServiceType) => void;
  remove: (codigo: number, index: number) => void;
  quantity: number[];
  addQuantity: (index: number, service: ServiceType) => void;
  subtractQuantity: (i: number) => void;
  resetSale: () => void;
  setServices: (services: ServiceType[] | undefined) => void;
};

const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  add: (product) =>
    set((state) => ({ products: [...state.products, product] })),
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
  resetSale: () => set(() => ({ products: [], quantity: [] })),
}));

export const UseServicesStore = create<ServicesStore>((set) => ({
  services: [],
  add: (service) =>
    set((state) => ({ services: [...state.services, service] })),
  remove: (codigo, index) =>
    set((state) => ({
      services: state.services.filter(
        (service) => service.codigoServicio !== codigo
      ),
      quantity: [
        ...state.quantity.slice(0, index),
        ...state.quantity.slice(index + 1),
      ],
    })),
  quantity: [],
  addQuantity: (i, service) =>
    set((state) => ({
      quantity: state.quantity.map((q, index) => (i === index ? q + 1 : q)),
    })),
  subtractQuantity: (i) =>
    set((state) => ({
      quantity: state.quantity.map((q, index) =>
        i == index ? (q > 1 ? q - 1 : q) : q
      ),
    })),
  resetSale: () => set(() => ({ services: [], quantity: [] })),
  setServices: (services) => set(() => ({ services: services })),
}));

type Client = {
  client: ClientType | undefined;
  setClient: (client: ClientType) => void;
  resetClient: () => void;
};
export const useClientStore = create<Client>((set) => ({
  client: undefined,
  setClient: (client) => set(() => ({ client: client })),
  resetClient: () => set(() => ({ client: undefined })),
}));

type Service = {
  service: ServiceType | undefined;
  setService: (service: ServiceType) => void;
  resetService: () => void;
};

export const UseServiceStoreUpdateDelete = create<Service>((set) => ({
  service: undefined,
  setService: (service) => set(() => ({ service: service })),
  resetService: () => set(() => ({ service: undefined })),
}));

export default useProductsStore;
