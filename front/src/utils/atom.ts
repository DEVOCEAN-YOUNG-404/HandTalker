import { atom } from "recoil";

export const translateState = atom({
  key: "translateState",
  default: false,
});

export const authState = atom({
  key: "authState",
  default: false,
});
