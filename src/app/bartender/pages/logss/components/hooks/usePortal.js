import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function usePortal(id = "desktop-root") {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState(null);

  useEffect(() => {
    const el = document.getElementById(id);
    setContainer(el);
    setMounted(true);
  }, [id]);

  return (children) =>
    mounted && container ? createPortal(children, container) : null;
}