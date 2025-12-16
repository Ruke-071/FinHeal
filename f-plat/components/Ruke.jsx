"use client"

import React, {useEffect,useRef} from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
import { TextGenerateEffect } from './ui/text-generate-effect'
import ColourfulText from './ui/colourful-text'

const RukeSection = () => {
  const ImageRef = useRef();
  useEffect(() => {
  const imageElement = ImageRef.current;

  if (!imageElement) return;

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollThreshold = 300;

    if (scrollPosition > scrollThreshold) {
      imageElement.classList.add("scrolled");
    } else {
      imageElement.classList.remove("scrolled");
    }
  };

  
  handleScroll();

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <div className="pb-20 px-4">

      <section className="pb-4 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-8xl lg:text-[105px]">
            <TextGenerateEffect
              words="Rule your money <br> with smarts"
              className="gradient-title"
            />
          </h1>
        </div>
      </section>

      <div className="container text-justify">
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Take control of your money with an <ColourfulText> AI-powered platform </ColourfulText> that tracks, analyzes, and optimizes your finances in real time. Automate expenses, get smart insights, and manage everything in one secure dashboard.
        </p>

        <p className="text-xl font-semibold text-center">
          Smarter insights. Stronger financial future.
        </p>
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <Link href="/dashboard">
          <Button size="lg" variant="outline" className="h-12 px-8 text-base flex items-center justify-center">
            Get Started
          </Button>
        </Link>

        <Link href="https://www.youtube.com/watch?v=Zuu6ClXRabE" target="_blank">
          <Button size="lg" className="h-12 px-8 text-base flex items-center justify-center text-black">
            Demo Video
          </Button>
        </Link>
      </div>
      <div className='ruke-Image-Wrapper'>
      <div ref={ImageRef} className="ruke-Image">
        <Image
          src="/benn.png"
          alt="Ruke Image"
          width={1280}
          height={720}
          className="rounded-lg shadow-2xl border mx-auto mt-10"
          priority
        />
      </div>
      </div>

    </div>
  )
}

export default RukeSection
