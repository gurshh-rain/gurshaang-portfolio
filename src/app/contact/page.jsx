"use client";

import { useRevealer } from "../hooks/useRevealer";
import { useEffect } from "react";
import HoverScrollText from "../components/HoverScrollText";
import GooeyTextReveal from "../components/GooeyTextReveal";

const contactLinks = [
  {
    id: "email",
    href: "mailto:gurshaan1124@gmail.com",
    label: "Email",
    value: "gurshaan1124@gmail.com",
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/gurshaan-gill-5b48603a4/",
    label: "LinkedIn",
    value: "Gurshaan Gill",
    external: true,
  },
  {
    id: "github",
    href: "https://github.com/gurshh-rain",
    label: "GitHub",
    value: "@gurshh-rain",
    external: true,
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/gurshhhh_",
    label: "Instagram",
    value: "@gurshhhh_",
    external: true,
  },
];

export default function Contact() {
  useRevealer();

  useEffect(() => {
    const cont = document.querySelector(".contact");
    const ani = document.querySelectorAll(".contact .ani");

    if (cont) {
      setTimeout(() => cont.classList.add("visible"), 1350);
    }

    ani.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 1350 + (i + 1) * 100);
    });
  }, []);

  return (
    <>
      <div className="revealer"></div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .contact {
            padding: 4em 2.5em 2em;
            gap: 1.5em;
            justify-content: center;
          }
          .contact-hero {
            gap: 0.5em;
            max-width: 700px;
          }
          .contact-headline {
            font-size: clamp(2.5rem, 8vw, 5.5rem);
          }
          .contact-sub {
            font-size: 0.85rem;
            max-width: 42ch;
          }
          .contact-list {
            gap: 0;
          }
          .contact-row {
            padding: 0.9em 0.75em;
          }
          .contact-body h2 {
            font-size: 1em;
          }
          .contact-body span {
            font-size: 0.8em;
          }
          .contact-img-wrap {
            height: 22vh;
            min-height: 160px;
          }
          @media (max-width: 640px) {
            .contact {
              padding: 3em 1.5em 1.5em;
              gap: 1.25em;
            }
            .contact-headline {
              font-size: clamp(2rem, 12vw, 3.5rem);
            }
            .contact-img-wrap {
              height: 18vh;
              min-height: 120px;
            }
          }
        `
      }} />
      <div className="contact">
        <div className="contact-hero">
          <GooeyTextReveal>
            <h1 className="contact-headline">get in touch.</h1>
          </GooeyTextReveal>
          <GooeyTextReveal delay={0.1}>
            <p className="contact-sub">
              Open to collaborations, research, and side projects. If you have an
              idea in mind, send a note by email or reach out directly.
            </p>
          </GooeyTextReveal>
        </div>

        <ul className="contact-list ani">
          {contactLinks.map((link, i) => {
            const index = String(i + 1).padStart(2, "0");
            return (
              <li key={link.id}>
                <a
                  className="contact-row"
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  <span className="contact-index">{index}</span>
                  <div className="contact-body">
                    <h2>
                      <HoverScrollText>{link.label.toUpperCase()}</HoverScrollText>
                    </h2>
                    <span>{link.value}</span>
                  </div>
                  <span className="contact-arrow">→</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="contact-img-wrap ani">
          <img src="hero3.jpg" alt="Gurshaan Gill" />
          <span className="contact-img-label">Toronto, CA</span>
        </div>
      </div>
    </>
  );
}
