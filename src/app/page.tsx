"use client";
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

function SwipeToStartButton() {
  const handleClick = () => {
    window.location.href = 'https://t.me/Exotype01bot';
  };

  return (
    <motion.button
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(e, { offset }) => {
if (offset.x > 150) {
  window.location.href = 'https://t.me/Exotype01bot';
}
      }}
      onClick={handleClick}
      className="group relative cursor-grab overflow-hidden rounded-full bg-gradient-to-r from-yellow-500 to-black px-8 py-5 shadow-2xl active:cursor-grabbing"
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 -translate-x-full bg-black/20 transition-transform duration-500 ease-out group-hover:translate-x-0" />

      <div className="relative flex items-center gap-4">
        <span className="text-base font-bold text-white sm:text-lg">
          Lets Find Out
        </span>
        <div className="flex -space-x-2">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

export default function ArtifyNFTOnboarding() {
  const texts = [
    "Do you grow fast or slow?",
    "Do you lose strength or keep it?",
    "Do you recover or crash?"
  ];

  const images = [
    "/premium_photo-1737059984475-0de9c0dcacf1.jpg",
    "/premium_photo-1737059984272-11f837d448e7.jpg",
    "/premium_photo-1737059983495-fd53c6d72722.jpg",
    "/premium_photo-1737059984674-5ef17c8ad212.jpg",
    "/premium_photo-1737059983277-eb12cc669859.jpg"
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pauseAuto, setPauseAuto] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024); // Default width

  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      left: `${(i * 5) % 100}%`,
      animationDelay: `${(i * 0.5) % 10}s`,
      animationDuration: `${10 + (i * 0.5) % 10}s`,
    }));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
      setWindowWidth(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    const text = texts[currentTextIndex];

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      // Pause before next text
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, currentTextIndex, texts]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pauseAuto) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, pauseAuto]);



  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-end pb-20 text-center">

      {/* Image Carousel */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <motion.div
          className="flex h-full w-full"
          drag="x"
          dragConstraints={{ left: -((images.length - 1) * windowWidth), right: 0 }}
          dragElastic={0.1}
          onDragEnd={(event, info) => {
            const { offset, velocity } = info;
            const swipeThreshold = 50;
            if (offset.x > swipeThreshold || velocity.x > 500) {
              // Swipe right (previous image)
              setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
              setPauseAuto(true);
              setTimeout(() => setPauseAuto(false), 5000);
            } else if (offset.x < -swipeThreshold || velocity.x < -500) {
              // Swipe left (next image)
              setCurrentImageIndex((prev) => (prev + 1) % images.length);
              setPauseAuto(true);
              setTimeout(() => setPauseAuto(false), 5000);
            }
          }}
          animate={{ x: -currentImageIndex * windowWidth }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full relative">
              <Image
                src={image}
                alt={`Background ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            </div>
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      </div>

      {/* Subtle Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: particle.left,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Logo – now fixed at top-left */}
      <div className="absolute top-0 left-0 z-30 px-7 pt-8 md:pt-10">
        <Image
          src="/logo-removebg-preview.png"
          alt="Logo"
          width={80}
          height={80}
          className="[filter:drop-shadow(0_0_8px_rgba(234,179,8,1))]"
          priority
        />
      </div>

      {/* Main content */}
      <div className="relative z-20 px-7 mt-20 md:mt-32 animate-fadeIn"> {/* Added extra top margin to compensate for removed logo space */}
        <h2 className="text-yellow-500 text-5xl font-black leading-tight mb-6 anton-regular text-left">
          What&apos;s your Exotype?
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed mb-16 max-w-[300px] text-left">
          {displayedText}
        </p>

        <SwipeToStartButton />
      </div>
    </div>
  );
}
