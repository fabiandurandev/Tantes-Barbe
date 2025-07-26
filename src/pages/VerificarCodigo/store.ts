import { create } from "zustand";

type emailStore = {
  email: string;
  setEmail: (email: string) => void;
};

const useEmailStore = create<emailStore>((set) => ({
  email: "",
  setEmail: (email: string) => set({ email }),
}));

export default useEmailStore;
