"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const GooeyTextReveal = React.forwardRef(function GooeyTextReveal(
  {
    children,
    mode = "scroll",
    delay = 0,
    duration = 1.2,
    stagger = 0.08,
    blurAmount = 0.15,
    ease = "power3.out",
    start = "top 85%",
    end = "bottom 75%",
    once = true,
    disabled = false,
    split = false,
    onComplete,
    ...props
  },
  forwardedRef,
) {
  const containerRef = React.useRef(null);
  const reactId = React.useId();
  const filterId = React.useMemo(
    () => `gooey-text-reveal-${reactId.replace(/:/g, "")}`,
    [reactId],
  );
  const setContainerRef = React.useCallback(
    (node) => {
      containerRef.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef],
  );

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || disabled) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) return;

      let split;
      let tween;
      let disposed = false;

      const revert = () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
        tween = null;
        split?.revert();
        split = null;
        if (container && !split) {
          container.style.filter = "";
          container.style.willChange = "";
        }
      };

      const build = () => {
        if (disposed) return;
        revert();

        let layers;

        if (split) {
          split = SplitText.create(container, {
            type: "lines",
            linesClass: "gooey-text-reveal-line",
            aria: "auto",
          });

          layers = split.lines.map((line) => {
            const lineElement = line;
            lineElement.style.display = "block";
            lineElement.style.filter = `url(#${filterId}) blur(0.2px)`;
            lineElement.style.willChange = "filter";

            const inner = document.createElement("span");
            inner.dataset.gooeyRevealInner = "";
            inner.style.display = "inline-block";
            inner.style.willChange = "filter";

            while (lineElement.firstChild) {
              inner.appendChild(lineElement.firstChild);
            }

            lineElement.appendChild(inner);
            return inner;
          });
        } else {
          container.style.display = "block";
          container.style.filter = `url(#${filterId}) blur(0.2px)`;
          container.style.willChange = "filter";
          layers = [container];
        }

        if (layers.length === 0) return;

        gsap.set(layers, { filter: `blur(${blurAmount}em)` });

        const animation = {
          filter: "blur(0em)",
          duration,
          ease,
          stagger: split ? stagger : 0,
          onComplete: () => {
            // drop the filter + will-change so finished text doesn't
            // keep a compositing layer alive (major hover/scroll lag)
            layers.forEach((el) => {
              el.style.filter = "";
              el.style.willChange = "";
            });
            onComplete?.();
          },
        };

        if (mode === "scrub") {
          animation.scrollTrigger = {
            trigger: container,
            start,
            end,
            scrub: true,
            invalidateOnRefresh: true,
          };
        } else if (mode === "scroll") {
          animation.delay = delay;
          animation.scrollTrigger = {
            trigger: container,
            start,
            once,
            toggleActions: once ? "play none none none" : "play none none reverse",
            invalidateOnRefresh: true,
          };
        } else {
          animation.delay = delay;
        }

        tween = gsap.to(layers, animation);
      };

      build();

      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(() => {
          if (!disposed) build();
        });
      }

      return () => {
        disposed = true;
        revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [
        mode,
        delay,
        duration,
        stagger,
        blurAmount,
        ease,
        start,
        end,
        once,
        disabled,
        split,
        onComplete,
        filterId,
      ],
    },
  );

  return (
    <>
      <div ref={setContainerRef} {...props}>
        {children}
      </div>

      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
});

GooeyTextReveal.displayName = "GooeyTextReveal";

export default GooeyTextReveal;
