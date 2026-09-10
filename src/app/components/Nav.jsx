"use client";
import Link from "next/link"
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import AsciiGlitchRipple from "./AsciiGlitchRipple";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import styles from './Nav.module.css';

const Nav = () => {
    const router = useTransitionRouter();
    const pathname = usePathname();

    function triggerPageTransition() {
        document.documentElement.animate([
            {
                clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)"
            },
            {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
            }
        ], {
            duration: 2000,
            easing: "cubic-bezier(0.9, 0, 0.1, 1)",
            pseudoElement: "::view-transition-new(root)",
        });
    }

    const handleNavigation = (path) => (e) => {
        if (path === pathname) {
            e.preventDefault();
            return;
        }

        router.push(path, {
            onTransitionReady: triggerPageTransition,
        });
    };

    return (
        <div className="nav">
            <div className="col">
                <div className="nav-logo">
                    <Link href="/">
                        <AsciiGlitchRipple as="span">gurshaan gill</AsciiGlitchRipple>
                    </Link>
                </div>
            </div>
            <div className="col">
                <div className="nav-items">
                    <div className="nav-item">
                        <Link href="/work" onClick={handleNavigation("/work")}>
                            <AsciiGlitchRipple as="span">projects</AsciiGlitchRipple>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link href="/about" onClick={handleNavigation("/about")}>
                            <AsciiGlitchRipple as="span">about</AsciiGlitchRipple>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link href="/experience" onClick={handleNavigation("/experience")}>
                            <AsciiGlitchRipple as="span">experience</AsciiGlitchRipple>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link href="/contact" onClick={handleNavigation("/contact")}>
                            <AsciiGlitchRipple as="span">contact</AsciiGlitchRipple>
                        </Link>
                    </div>
                </div>
                <div className="nav-copy">
                    <div className="nav-item">
                        <Link href="https://www.linkedin.com/in/gurshaan-gill-5b48603a4/">
                            <AsciiGlitchRipple as="span">linkedin</AsciiGlitchRipple>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link href="https://github.com/gurshh-rain">
                            <AsciiGlitchRipple as="span">github</AsciiGlitchRipple>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link href="https://www.instagram.com/gurshhhh_">
                            <AsciiGlitchRipple as="span">instagram</AsciiGlitchRipple>
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link href="/resume" onClick={handleNavigation("/resume")}>
                            <AsciiGlitchRipple as="span">resume</AsciiGlitchRipple>
                        </Link>
                    </div>
                </div>
                <div className="nav-copy">
                    <p>toronto+waterloo, on</p>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}

export default Nav;
