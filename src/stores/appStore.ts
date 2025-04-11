import { create } from "zustand";

interface IAppStore {
  isSettingReady: boolean;
  playerCnt: number;
  baseBet: number;
  betPool: number;
  setSettingReady: (isSettingReady: boolean) => void;
  setPlayerCnt: (playerCnt: number) => void;
  setBaseBet: (baseBet: number) => void;
  setBetPool: (betPool: number) => void;
}

const useAppStore = create<IAppStore>((set) => ({
  isSettingReady: false,
  playerCnt: 1,
  baseBet: 10,
  betPool: 0,
  setPlayerCnt: (playerCnt: number) => set({ playerCnt }),
  setBaseBet: (baseBet: number) => set({ baseBet }),
  setBetPool: (betPool: number) => set({ betPool }),
  setSettingReady: (isSettingReady: boolean) => set({ isSettingReady }),
}));

export default useAppStore;
