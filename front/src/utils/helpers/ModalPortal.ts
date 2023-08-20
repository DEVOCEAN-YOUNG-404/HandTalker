import ReactDOM from "react-dom";
import { ReactNode } from "react";

type ModalPortalProps = {
  children: ReactNode;
};

export const ModalPortal = ({ children }: ModalPortalProps) => {
  const element = document.getElementById("modal-root");

  if (!element) {
    throw new Error("Element with id 'modal-root' not found in the document.");
  }

  return ReactDOM.createPortal(children, element);
};
