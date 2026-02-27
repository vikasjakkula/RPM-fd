import { useEffect, useRef, useState } from "react";

const defaultOptions = {
  rootMargin: "0px 0px -80px 0px", // trigger when element is 80px from bottom of viewport
  threshold: 0.1,
  once: true,
};

/**
 * Wraps content and adds a "text moves up into view" animation when the element
 * enters the viewport on scroll. Uses Intersection Observer for performance.
 * @param {React.ReactNode} children
 * @param {boolean} stagger - if true, uses scroll-reveal-stagger (stagger children)
 * @param {object} options - { rootMargin, threshold, once }
 */
export default function ScrollReveal({
  children,
  stagger = false,
  options = {},
  as: Tag = "div",
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const { rootMargin, threshold, once } = { ...defaultOptions, ...options };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        if (once && el) observer.unobserve(el);
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  const revealClass = stagger ? "scroll-reveal-stagger" : "scroll-reveal";
  const visibleClass = visible ? " is-visible" : "";

  return (
    <Tag
      ref={ref}
      className={`${revealClass}${visibleClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
