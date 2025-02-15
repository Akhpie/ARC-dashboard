import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Section {
  title: string;
  content: string;
}

interface SectionProps extends Section {
  index: number;
  totalSections: number;
}

const Section: React.FC<SectionProps> = ({
  title,
  content,
  index,
  totalSections,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  const lineHeight = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "100%", "100%"]
  );

  const currentColor = useTransform(
    scrollYProgress,
    [1, 1],
    ["rgb(147, 51, 234)", "rgb(59, 130, 246)"]
  );

  // Border progress animations
  const rightProgress = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const bottomProgress = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const leftProgress = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const topProgress = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

  return (
    <div className="relative">
      {/* Connecting Line */}
      {index < totalSections - 1 && (
        <div className="absolute left-1/2 top-full h-32 w-0.5 bg-white">
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{
              height: lineHeight,
              backgroundColor: currentColor,
              originY: 0,
            }}
          />
        </div>
      )}

      {/* Section Content */}
      <motion.div
        ref={sectionRef}
        style={{
          opacity,
          scale,
        }}
        className="relative z-10 mb-20 p-8 rounded-lg bg-gradient-to-br from-white/10 to-white/70 backdrop-blur-lg border border-white/20 hover:bg-white/30 transition-all ease-in-out duration-300 shadow-lg overflow-hidden"
      >
        {/* Animated Border Lines */}
        <div className="absolute inset-0">
          {/* Right Border */}
          <motion.div
            className="absolute top-0 right-0 w-1 bg-purple-600"
            style={{
              height: "100%",
              scaleY: rightProgress,
              transformOrigin: "top",
              backgroundColor: currentColor,
            }}
          />
          {/* Bottom Border */}
          <motion.div
            className="absolute bottom-0 right-0 h-1 bg-purple-600"
            style={{
              width: "100%",
              scaleX: bottomProgress,
              transformOrigin: "right",
              backgroundColor: currentColor,
            }}
          />
          {/* Left Border */}
          <motion.div
            className="absolute bottom-0 left-0 w-1 bg-purple-600"
            style={{
              height: "100%",
              scaleY: leftProgress,
              transformOrigin: "bottom",
              backgroundColor: currentColor,
            }}
          />
          {/* Top Border */}
          <motion.div
            className="absolute top-0 left-0 h-1 bg-purple-600"
            style={{
              width: "100%",
              scaleX: topProgress,
              transformOrigin: "left",
              backgroundColor: currentColor,
            }}
          />
        </div>

        {/* Circle Indicator */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-8 h-8 rounded-full bg-white flex items-center justify-center"
          style={{
            border: useTransform(currentColor, (color) => `2px solid ${color}`),
          }}
        >
          <motion.div
            className="w-4 h-4 rounded-full"
            style={{
              scale: useTransform(scrollYProgress, [0, 0.5], [0, 1]),
              backgroundColor: currentColor,
            }}
          />
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-4"
          style={{ y: useTransform(scrollYProgress, [0, 0.5], [20, 0]) }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-gray-600"
          style={{ y: useTransform(scrollYProgress, [0, 0.5], [30, 0]) }}
        >
          {content}
        </motion.p>
      </motion.div>
    </div>
  );
};

const ScrollAnimationDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const sections: Section[] = [
    {
      title: "AI-Powered Academic Assessment",
      content:
        "Identifies students' weak areas, generates personalized assignments, auto-grades responses, and delivers performance reports. It also automates question paper creation and answer sheet evaluation.",
    },
    {
      title: "Interactive AI Tutors & Digital Twins",
      content:
        "Engages students with intelligent chatbots that provide hints and guidance. Additionally, digital twin educators offer subject-specific support for an interactive learning experience.",
    },
    {
      title: "One stop Productivity tools for students",
      content:
        "Focus mode , digital dairy planner,2 min summaraied news regarding tech, sports, business. Removes the any news with political bias, networking with fellow students with similar hobbies and collaborating together to create something.",
    },
    {
      title: "Access to higher education material",
      content:
        "Jee mains and neet study material. Research problem statements simplified and abstraction from complex overwhelming math with visual animations",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full max-w-4xl mx-auto p-8 bg-gradient-to-b"
    >
      <div className="relative top-0 bg-white/10 backdrop-blur-lg p-6 mb-8 rounded-xl shadow-lg border border-white/20">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text drop-shadow-lg font-inter">
          Integration of AI in education
        </h1>
      </div>

      {sections.map((section, index) => (
        <Section
          key={index}
          index={index}
          totalSections={sections.length}
          title={section.title}
          content={section.content}
        />
      ))}
    </div>
  );
};

export default ScrollAnimationDemo;
