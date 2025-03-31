import { X } from "lucide-react";
import ReactDom from "react-dom";
import { useEffect, useState } from "react";

const modalRoot =
  document.getElementById("modal") ||
  (() => {
    const root = document.createElement("div");
    root.id = "modal";
    document.body.appendChild(root);
    return root;
  })();

export default function Modal({ active, setActive, children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300); // Matches transition duration
    }
  }, [active]);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setActive(false);
    }, 300);
  };

  return ReactDom.createPortal(
    <div
      role="dialog"
      aria-modal="true"
      data-visible={isVisible ? "true" : "false"}
      onClick={closeModal}
      className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center
      transition-opacity duration-300 bg-overlay ${active ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[300px] flex-col items-center justify-center
        rounded-base border-2 border-border dark:border-darkBorder bg-main p-10 pt-12 font-base
        shadow-light dark:shadow-dark transition-all duration-300"
      >
        <button onClick={closeModal}>
          <X className="absolute right-3 top-3 h-6 w-6" />
        </button>
        {children}
        <button
          className="mt-5 cursor-pointer rounded-base border-2 border-border dark:border-darkBorder bg-white px-4 py-1.5
          font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
          onClick={closeModal}
        >
          Ok
        </button>
      </div>
    </div>,
    modalRoot,
  );
}
