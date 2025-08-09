import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import "./App.css";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
      
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

  // Loading Screen Component
  const LoadingScreen = () => (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-3xl"
        >
          💻
        </motion.div>
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl font-bold text-white mb-4"
        >
          Loading Portfolio...
        </motion.h2>
        <motion.div className="flex space-x-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-cyan-400 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );

  // Background Animation Component
  interface BackgroundAnimationProps {
    isDark: boolean;
  }
  const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({
    isDark,
  }) => {
    
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    return (
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        {/* 🧊 Glassy Boxes */}
        {[...Array(5)].map((_, i) => {
          const size = 100 + Math.random() * 100;
          return (
            <motion.div
              key={`box-${i}`}
              className="absolute rounded-[20px] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
  border border-white/20 backdrop-blur-[10px] 
  bg-white/10 dark:bg-white/5"
              style={{
                width: size,
                height: size,
                background: isDark
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(255, 255, 255, 0.5)",
                top: Math.random() * windowSize.height,
                left: Math.random() * windowSize.width,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* 🌌 Glowing Orbs */}
        {[...Array(3)].map((_, i) => {
          const orbSize = 300 + Math.random() * 200;
          return (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full blur-3xl opacity-30"
              style={{
                width: orbSize,
                height: orbSize,
                background: isDark
                  ? "radial-gradient(circle, rgba(139,92,246,0.2), transparent)"
                  : "radial-gradient(circle, rgba(236,72,153,0.3), transparent)",
                top: Math.random() * windowSize.height,
                left: Math.random() * windowSize.width,
              }}
              animate={{
                x: [0, 100, -100, 0],
                y: [0, 100, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 30 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        
        
      </div>
    );
  };
  const BackgroundAnimation1 = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating Tech Icons */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-10 dark:opacity-5"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {["⚛️", "🚀", "💻", "🔧", "⚡", "🎨", "📱", "🌐"][i % 8]}
        </motion.div>
      ))}

      {/* Gradient Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            background: isDark
              ? `radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)`
              : `radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)`,
            width: `${200 + Math.random() * 200}px`,
            height: `${200 + Math.random() * 200}px`,
          }}
          animate={{
            x: [0, Math.random() * 400, 0],
            y: [0, Math.random() * 400, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Interactive Mouse Follower */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
          
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
  if (isLoading) {
    return <LoadingScreen />;
  }
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget);
    emailjs
      .send(
        "service_16c35dy",
        "template_jvw7a5r",
         data,
        "pEVMpRUvS4yXJkNoy"
      )
      .then(() => {
        alert("✅ Message sent successfully!");
        setData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        alert("❌ Failed to send message, try again.");
        console.error(error);
      });
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark ? "dark" : ""
      }`}
    >
      <BackgroundAnimation isDark={isDark} />
      <BackgroundAnimation1 />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent cursor-pointer"
            >
              Dhineshwaran
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? "text-purple-600 dark:text-cyan-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-cyan-400"
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-cyan-400 dark:to-purple-400"
                    />
                  )}
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 dark:from-cyan-500 dark:to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isDark ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 dark:from-cyan-500 dark:to-purple-500 text-white"
              >
                {isDark ? (
                  <SunIcon className="w-4 h-4" />
                ) : (
                  <MoonIcon className="w-4 h-4" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="p-2 z-50 relative rounded-lg bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-white/20 dark:border-gray-700/20 md:hidden"
            >
              <div
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex justify-end p-4 transition-colors duration-200 cursor-pointer"
              >
                <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" />
              </div>
              <div className="p-6 pt-20">
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        x: 10,
                        backgroundColor: "rgb(147, 51, 234)",
                        color: "white",
                      }}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block w-full text-left px-6 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-cyan-400 hover:bg-purple-50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-300"
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full text-center">
          {/* Animated Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white"
          >
            Hello, I'm{" "}
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="font-serif bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent bg-300% animate-gradient"
            >
              Dhineshwaran M
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 text-xl sm:text-2xl text-gray-700 dark:text-gray-300 tracking-wide"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Front-End Developer
            </motion.span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            Passionate about creating beautiful, functional, and user-friendly
            web applications. I bring ideas to life with modern technologies and
            clean code.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-cyan-500 dark:to-purple-500 text-white rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              📧 Get In Touch
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgb(139, 92, 246)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:bg-purple-50 dark:hover:bg-gray-800 transition-all duration-300"
              onClick={() =>
                window.open(
                  "https://github.com/Dhineshwarancode",
                  "_blank"
                )
              }
            >
              📂 View My Code
            </motion.button>
          </motion.div>

          {/* Scroll Indicator (optional) */}
          <div className="mt-16">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-8 rounded-full border-2 border-gray-600 dark:border-gray-300 flex items-center justify-center mx-auto"
            >
              <span className="text-purple-600 dark:text-cyan-400 text-xl">
                ↓
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white">
              Know About Me
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-cyan-400 dark:to-purple-400 mx-auto rounded-full mt-4"
            />
          </motion.div>

          <div className="grid place-items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className=" backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-3xl p-10 shadow-xl border border-white/20 dark:border-gray-700/20"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                My Journey as a Developer
              </h3>

              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                {[
                  "I'm a passionate front-end developer with experience creating engaging and user-friendly web applications. My journey started with curiosity about how websites work.",
                  "I specialize in React, JavaScript, and modern web technologies. I believe in writing clean, maintainable code and building elegant, responsive UIs.",
                  "Beyond code, I enjoy exploring new tech, contributing to open source.",
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
                className="mt-8 grid grid-cols-2 gap-4"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My Skills
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-cyan-400 dark:to-purple-400 mx-auto rounded-full mb-6"
            />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to
              life
            </p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                title: "Frontend",
                skills: [
                  { name: "React", level: 90, icon: "⚛️" },
                  { name: "JavaScript", level: 95, icon: "🟨" },
                  { name: "CSS & HTML", level: 90, icon: "🎨" },
                  { name: "Java Programing", level: 92, icon: "♨️" },
                  { name: "python", level: 80, icon: "👨🏻‍💻" },
                ],
              },
              {
                title: "Backend",
                skills: [
                  { name: "Node.js", level: 75, icon: "🟢" },
                  { name: "Express", level: 70, icon: "🚀" },
                  { name: "MongoDB", level: 68, icon: "🍃" },
                  { name: "MYSQL", level: 80, icon: "🛢" },
                ],
              },
              {
                title: "Tools",
                skills: [
                  { name: "Git", level: 85, icon: "📝" },
                  { name: "VS Code", level: 95, icon: "💙" },
                ],
              },
            ].map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{
                        scale: 1.05,
                        y: -10,
                        boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)",
                      }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                      }}
                      viewport={{ once: true }}
                      className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 text-center cursor-pointer"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                        className="text-4xl mb-4"
                      >
                        {skill.icon}
                      </motion.div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {skill.name}
                      </h4>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-cyan-400 dark:to-purple-400 rounded-full"
                        />
                      </div>
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium text-gray-600 dark:text-gray-400"
                      >
                        {skill.level}%
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My Projects
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-cyan-400 dark:to-purple-400 mx-auto rounded-full mb-6"
            />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are some of the projects I've worked on recently
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description:
                  "Modern e-commerce platform with cart functionality",
                technologies: ["React", "Node.js", "MongoDB", "Stripe"],
                image: "🛒",
                repo: "https://deliver-food-6.onrender.com",
              },
              {
                title: "TicTacToe Game using Java",
                description:
                  "Tic-Tac-Toe is a classic game that two people can enjoy together",
                technologies: ["Java"],
                image: "📋",
                repo: "https://github.com/Dhineshwarancode/sample_code/blob/main/TicTacToe_game.java",
              },
              {
                title: "Portfolio Website",
                description:
                  "Responsive portfolio with animations and dark mode",
                technologies: ["React", "Framer Motion", "Tailwind", "EmailJS"],
                image: "💼",
                repo: "https://github.com/Dhineshwarancode/My-Portfolio",
              },
              {
                title: "Quiz Management",
                description:
                  "Created the Quiz management program in scripting mode",
                technologies: ["Python"],
                image: "📝",
                repo: "https://github.com/Dhineshwarancode/sample_code/blob/main/quiz_game.py",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 25px 50px rgba(139, 92, 246, 0.3)",
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-2xl overflow-hidden shadow-xl border border-white/20 dark:border-gray-700/20 cursor-pointer group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center text-6xl relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-cyan-500/20 dark:to-purple-500/20"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.span
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    {project.image}
                  </motion.span>
                </motion.div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm rounded-full"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-purple-600 dark:text-cyan-400 hover:text-purple-800 dark:hover:text-cyan-300 transition-colors"
                    >
                      <span>🔗</span>
                      <span className="text-sm">Live</span>
                    </motion.button>
                    <a
                      href={`${project.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
                      >
                        <span>📂</span>
                        <span className="text-sm">Code</span>
                      </motion.button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-cyan-400 dark:to-purple-400 mx-auto rounded-full mb-6"
            />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ready to start a project together? Let's connect!
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20"
            >
              <div className="text-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    y: { duration: 2, repeat: Infinity },
                    rotate: { duration: 4, repeat: Infinity },
                  }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-cyan-500 dark:to-purple-500 rounded-full mb-4 text-2xl"
                >
                  📧
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Let's Work Together
                </h3>
              </div>

              <form onSubmit={sendEmail} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <motion.input
                    whileFocus={{
                      scale: 1.02,
                      borderColor: "rgb(139, 92, 246)",
                    }}
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <motion.input
                    whileFocus={{
                      scale: 1.02,
                      borderColor: "rgb(139, 92, 246)",
                    }}
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{
                      scale: 1.02,
                      borderColor: "rgb(139, 92, 246)",
                    }}
                    required
                    rows={4}
                    name="message"
                    value={data.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-cyan-500 dark:to-purple-500 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
                >
                  <span>📤</span>
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "📧",
                title: "Email",
                info: "dhineshwaranmurugan2005@gmail.com",
              },
              { icon: "📱", title: "Phone", info: "+91 9080036762" },
              { icon: "", title: "Location", info: "TamilNadu" },
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)",
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="text-center backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 cursor-pointer"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="text-4xl mb-4"
                >
                  {contact.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {contact.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {contact.info}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                Dhineshwaran M
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                Passionate front-end developer creating beautiful and functional
                web experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-6"
            >
              {[
                { icon: "📂", label: "GitHub" },
                { icon: "💼", label: "LinkedIn" },
                { icon: "🐦", label: "Twitter" },
                { icon: "📧", label: "Email" },
              ].map(({ icon, label }, index) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.2,
                    y: -5,
                    boxShadow: "0 10px 20px rgba(139, 92, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg text-2xl"
                  aria-label={label}
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    {icon}
                  </motion.span>
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Links
              </h4>
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-cyan-400 transition-colors duration-200"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center space-x-2">
              <span>© 2025 My Portfolio</span>

              <span>Dhineshwaran M</span>
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
export default App;
