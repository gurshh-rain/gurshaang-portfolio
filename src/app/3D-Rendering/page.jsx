"use client";
import Link from "next/link"
import { useRevealer } from "../hooks/useRevealer";
import { useEffect } from "react";
import gsap from "gsap";

const Render = () => {
    useRevealer();

    useEffect(() => {
    const slider = document.querySelector(".slider");
    const slideTitle = document.querySelector(".slide-title");
    const thumbnailWheel = document.querySelector(".thumbnail-wheel");

    const totalSlides = 10;
    const endScale = 5;
    let slideWidth = window.innerWidth * 0.45;
    let viewportCenter = window.innerWidth / 2;
    let isMobile = window.innerWidth < 1000;

    const slideTitles = [
        "Blurred Vision",
        "Hey",
        "Crypto",
        "Data Silhouette",
        "2077",
        "Destiny",
        "Scarlet Culture",
        "Light and Life",
        "The Pillars",
        "Imagining",
    ];

    let currentX = 0;
    let targetX = 0;
    let isScrolling = false;
    let scrollTimeout;
    let activeSlideIndex = 0;

    function createSlides() {
        for(let i = 0; i < totalSlides * 3; i++){
            const slide = document.createElement("div");
            slide.className = "slide";

            const img = document.createElement("img");
            const imageNumber = (i % totalSlides) + 1;
            img.src = `/slide-${imageNumber}.jpg`;

            slide.appendChild(img);
            slider.appendChild(slide);
        }
    }

    function initializeSlider() {
        const slides = document.querySelectorAll(".slide");

        slides.forEach((slide,index) => {
            const x = index * slideWidth - slideWidth;
            gsap.set(slide, { x: x});
        });

        const centerOffset= window.innerWidth / 2 - slideWidth / 2
        currentX = centerOffset;
        targetX = centerOffset;
    }

    createSlides();
    initializeSlider();

    function handleScroll(e) {
        const scrollIntensity = e.deltaY || e.detail || e.wheelDelta * -1;
        targetX -= scrollIntensity * 1;

        isScrolling = true;
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    }

    function animate() {
        currentX += (targetX - currentX) * 0.1;

        const totalWidth = totalSlides * slideWidth;

        if(currentX > 0) {
            currentX -= totalWidth;
            targetX -= totalWidth;
        } else if (currentX < -totalWidth) {
            currentX += totalWidth;
            targetX += totalWidth;
        }
    }

    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
        const x = index * slideWidth + currentX;
        gsap.set(slide, { x: x});
    });

    requestAnimationFrame(animate);

    window.addEventListener("wheel", handleScroll, { passive: false});
    window.addEventListener("DOMMouseScroll", handleScroll, {passive: false});

    window.addEventListener(
        "scroll",
        function (e) {
            if(e.target === document || e.target === document.body) {
                window.scrollTo(0, 0);
            }
        },
        {passive: false}
    );

    animate();

    function animate() {
        currentX += (targetX - currentX) * 0.1;

        const totalWidth = totalSlides * slideWidth;
        if(currentX > 0){
            currentX -= totalWidth;
            targetX -= totalWidth;
        } else if (currentX < -totalWidth) {
            currentX += totalWidth;
            targetX += totalWidth;
        }

        const slides = document.querySelectorAll(".slide");

        slides.forEach((slide, index) => {
            const x = index * slideWidth + currentX;
            gsap.set(slide, { x:x });

            const slideCenterX = x + slideWidth / 2;
            const distanceFromCenter = Math.abs(slideCenterX - viewportCenter);

            const outerDistance = slideWidth / 2;
            const progress = Math.min(distanceFromCenter / outerDistance, 1);

            const easedProgress = 
                progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            const scale = 1 + easedProgress * (endScale - 1);

            const img = slide.querySelector("img");
            gsap.set(img, { scale: scale});

        });

        requestAnimationFrame(animate);
    }

    function createThumbnailItems() {
        for(let i = 0; i < totalSlides; i++){
            const angle = (i / totalSlides) * Math.PI * 2;
            const radius = isMobile ? 150 : 350;
            const x = radius * Math.cos(angle) + window.innerWidth / 2;
            const y = radius * Math.sin(angle) + window.innerHeight / 2 - 25;

            const thumbnail = document.createElement("div");
            thumbnail.className = "thumbnail-item";
            thumbnail.dataset.index = i;
            thumbnail.dataset.angle = angle;
            thumbnail.dataset.radius = radius;

            const img = document.createElement("img");
            const imageNumber = i + 1;
            img.src = `/slide-${imageNumber}.jpg`;
            thumbnail.appendChild(img);

            gsap.set(thumbnail, {
                x,
                y,
                transformOrigin: "center center",
            });

            thumbnailWheel.appendChild(thumbnail);
        }
    }

    createThumbnailItems();

    function updateThumbnailItems(){
        const exactSlideProgress = Math.abs(currentX) / slideWidth;
        const currentRotationAngle = -(exactSlideProgress * (360/totalSlides)) + 90;

        const thumbnails = document.querySelectorAll(".thumbnail-item");
        thumbnails.forEach((thumbnail) => {
            const baseAngle = parseFloat(thumbnail.dataset.angle);
            const radius = isMobile ? 150 : 350;
            const currentAngle = baseAngle + (currentRotationAngle * Math.PI) / 180;

            const x = radius * Math.cos(currentAngle) + window.innerWidth / 2;
            const y = radius * Math.sin(currentAngle) + window.innerHeight / 2- 25;

            gsap.set(thumbnail, {
                x: x,
                y: y,
                rotation: 0,
                transformOrigin: "center center",
            });
        });
    }


    function animate() {
        currentX += (targetX - currentX) * 0.1;
        const totalWidth = totalSlides * slideWidth;
        if(currentX > 0){
            currentX -= totalWidth;
            targetX -= totalWidth;
        } else if (currentX < -totalWidth) {
            currentX += totalWidth;
            targetX += totalWidth;
        }

        let centerSlideIndex = 0;
        let closestToCenter = Infinity;
        const slides = document.querySelectorAll(".slide");

        slides.forEach((slide, index) => {
            const x = index * slideWidth + currentX;
            gsap.set(slide, { x: x});

            const slideCenterX = x + slideWidth / 2;
            const distanceFromCenter = Math.abs(slideCenterX - viewportCenter);
            
            const outerDistance = slideWidth * 3;
            const progress = Math.min(distanceFromCenter / outerDistance, 1);

            const easedProgress = 
                progress < 0.5 
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            const scale = 1 + easedProgress * (endScale - 1);

            const img = slide.querySelector("img");
            gsap.set(img , {scale: scale});

            if(distanceFromCenter < closestToCenter) {
                closestToCenter = distanceFromCenter;
                centerSlideIndex = index % totalSlides;
            }
        });

        const currentTitleIndex = centerSlideIndex;
        slideTitle.textContent = slideTitles[currentTitleIndex];

        updateThumbnailItems();
        requestAnimationFrame(animate);
    }
    });
    return (
        <>
            <div className="revealer"></div>
            <div className="slider">
                <p className="slide-title">Blurred Vision</p>
            </div>
            <div className="thumbnail-wheel"></div>
        </>
    )
}

export default Render;