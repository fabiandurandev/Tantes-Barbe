import { create } from "zustand";
import type { VentaType } from "../../types";

type VentaTypeStore = {
  ventas: VentaType[] | undefined;
  setVentas: (ventas: VentaType[] | undefined) => void;
  resetVentas: () => void;
};

export const UseVentasStore = create<VentaTypeStore>((set) => ({
  ventas: undefined,
  setVentas: (ventas) => set(() => ({ ventas: ventas })),
  resetVentas: () => set(() => ({ ventas: undefined })),
}));

type DetalleVentaTypeStore = {
  venta: VentaType | undefined;
  setVenta: (venta: VentaType | undefined) => void;
  resetVenta: () => void;
};

export const UseDetalleVenta = create<DetalleVentaTypeStore>((set) => ({
  venta: undefined,
  setVenta: (venta) => set(() => ({ venta: venta })),
  resetVenta: () => set(() => ({ venta: undefined })),
}));
