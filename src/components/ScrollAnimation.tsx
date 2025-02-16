import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, CheckCircle } from "lucide-react";

interface Section {
  title: string;
  content: string[]; // Changed to array for points
}

interface SectionProps extends Omit<Section, "content"> {
  content: string[];
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

  // Circle indicator animations
  const circleScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const circleFill = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 0.2, 0.4, 0.6, 0.8, 1]
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
        className="relative z-10 mb-20 p-8 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:bg-white/5 transition-all ease-in-out duration-300 shadow-lg overflow-hidden"
      >
        {/* Animated Border Lines */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-1 bg-purple-600"
            style={{
              height: "100%",
              scaleY: rightProgress,
              transformOrigin: "top",
              backgroundColor: currentColor,
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-1 bg-purple-600"
            style={{
              width: "100%",
              scaleX: bottomProgress,
              transformOrigin: "right",
              backgroundColor: currentColor,
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-1 bg-purple-600"
            style={{
              height: "100%",
              scaleY: leftProgress,
              transformOrigin: "bottom",
              backgroundColor: currentColor,
            }}
          />
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
          className="text-2xl font-semibold text-white mb-4 font-inter drop-shadow-lg"
          style={{ y: useTransform(scrollYProgress, [0, 0.5], [20, 0]) }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="space-y-3"
          style={{ y: useTransform(scrollYProgress, [0, 0.5], [30, 0]) }}
        >
          {content.map((point, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-1 text-emerald-400 flex-shrink-0" />
              <p className="text-white/90 font-normal text-lg font-inter drop-shadow-md">
                {point}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const ScrollAnimationDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const sections: Section[] = [
    {
      title: "AI-Powered Academic Assessment",
      content: [
        "Identifies students' weak areas and generates personalized assignments",
        "Auto-grades responses and delivers detailed performance reports",
        "Automates question paper creation and evaluation process",
      ],
    },
    {
      title: "Interactive AI Tutors & Digital Twins",
      content: [
        "Intelligent chatbots providing real-time hints and guidance",
        "Digital twin educators offering subject-specific support",
        "24/7 personalized feedback and learning recommendations",
      ],
    },
    {
      title: "One stop Productivity tools for students",
      content: [
        "Focus mode and digital diary planner for efficient studying",
        "2-minute summarized news updates on tech, sports, and business",
        "Networking platform for collaboration with like-minded students",
      ],
    },
    {
      title: "Access to higher education material",
      content: [
        "Comprehensive JEE Mains and NEET study materials",
        "Research problems simplified with visual animations",
        "Interactive practice tests and step-by-step problem guides",
      ],
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full max-w-4xl mx-auto p-8 bg-gradient-to-b"
    >
      <div className="relative top-0 bg-white/5 backdrop-blur-lg p-6 mb-8 rounded-xl shadow-lg border border-white/20">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg font-inter">
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
