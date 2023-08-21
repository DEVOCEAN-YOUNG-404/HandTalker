import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const translateState = atom({
  key: "translateState",
  default: false,
});

export const authState = atom({
  key: "authState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});