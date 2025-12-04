import { create } from "zustand";
import type { MerchantsDetails } from "@_api/MerchantApi";

interface MerchantModalState {
  isOpen: boolean;
  selectedMerchant: MerchantsDetails | null;

  openModal: (merchant: MerchantsDetails) => void;
  closeModal: () => void;
}

export const useMerchantModalStore = create<MerchantModalState>((set) => ({
  isOpen: false,
  selectedMerchant: null,

  openModal: (merchant) =>
    set({
      isOpen: true,
      selectedMerchant: merchant,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      selectedMerchant: null,
    }),
}));
