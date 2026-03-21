import React, { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
    };

    // Ring lags behind with lerp
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.14);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.14);
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top  = `${ringPos.current.y}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    // Expand on interactive elements
    const expand = () => { ringRef.current?.classList.add("expand"); dotRef.current?.classList.add("dot-hide"); };
    const shrink = () => { ringRef.current?.classList.remove("expand"); dotRef.current?.classList.remove("dot-hide"); };

    const targets = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label");
    targets.forEach((el) => { el.addEventListener("mouseenter", expand); el.addEventListener("mouseleave", shrink); });

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      targets.forEach((el) => { el.removeEventListener("mouseenter", expand); el.removeEventListener("mouseleave", shrink); });
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

export default CustomCursor;
