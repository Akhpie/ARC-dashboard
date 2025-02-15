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
  const rightProgress = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
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
      title: "Open source does not mean open access",
      content:
        "Our initiative is driven by the belief that AI should be an openly shared asset. However, simply open sourcing AI models is insufficient. The predominance of large data centers controlling GPU resources presents a significant obstacle.",
    },
    {
      title: "Democratizing AI Resources",
      content:
        "We believe in breaking down the barriers that restrict access to AI computing power. By distributing computational resources more equitably, we can ensure that innovation isn't limited to those with access to massive data centers.",
    },
    {
      title: "Community-Driven Development",
      content:
        "The future of AI development should be shaped by a diverse community of contributors, not just large organizations. This requires both open-source code and accessible computing infrastructure.",
    },
    {
      title: "Sustainable AI Infrastructure",
      content:
        "As we work to make AI more accessible, we must also consider the environmental impact. Our approach focuses on efficient resource utilization and sustainable computing practices.",
    },
    {
      title: "Education and Empowerment",
      content:
        "Beyond providing access to resources, we're committed to educating and empowering developers. This includes comprehensive documentation, tutorials, and community support.",
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
