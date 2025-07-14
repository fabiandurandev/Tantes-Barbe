import { create } from "zustand";
import type {
  ComprasType,
  ItemProductType,
  SupplierType,
  VentaType,
} from "../../types";

type CompraTypeStore = {
  compras: ComprasType[] | undefined;
  setCompras: (compras: ComprasType[] | undefined) => void;
  resetCompras: () => void;
};

export const UseComprasStore = create<CompraTypeStore>((set) => ({
  compras: undefined,
  setCompras: (compras) => set(() => ({ compras: compras })),
  resetCompras: () => set(() => ({ compras: undefined })),
}));

type DetalleCompraTypeStore = {
  compra: ComprasType | undefined;
  setCompra: (compra: ComprasType | undefined) => void;
  resetCompra: () => void;
};

export const UseDetalleCompra = create<DetalleCompraTypeStore>((set) => ({
  compra: undefined,
  setCompra: (compra) => set(() => ({ compra: compra })),
  resetCompra: () => set(() => ({ compra: undefined })),
}));
