"use client";
import { Provider } from "react-redux";
import { store } from "./store";

export function ProvideStore({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
