import { create } from "zustand";

type tasaCambioStoreType = {
  tasaCambio: number | undefined;
  setTasaCambio: (tasa: number) => void;
};

export const tasaCambioStore = create<tasaCambioStoreType>((set) => ({
  tasaCambio: undefined,
  setTasaCambio: (tasa) => set(() => ({ tasaCambio: tasa })),
}));
