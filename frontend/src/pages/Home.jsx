// src/components/pages/Home.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaUsers, FaLock, FaBookReader } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import AOS from "aos";
import "../assets/aos.css";

gsap.registerPlugin(MotionPathPlugin);

const Home = () => {
  const { currentUser } = useAuth();
  const particlesRef = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, easing: "ease-in-out" });
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          motionPath: {
            path: [
              { x: Math.random() * 80 - 40, y: Math.random() * 80 - 40 },
              { x: Math.random() * 120 - 60, y: Math.random() * 120 - 60 },
              { x: Math.random() * 80 - 40, y: Math.random() * 80 - 40 },
            ],
            curviness: 1.5, // Smooth curve movement
            autoRotate: true, // Natural rotation
          },
          scale: Math.random() * 2 + 0.8,
          opacity: Math.random() * 0.7 + 0.3,
          duration: Math.random() * 5 + 10,
          repeat: -1,
          repeatDelay: Math.random() * 4 + 8,
          ease: "power1.inOut",
          delay: 5,
        });
      }
    });

    // Animate the gradient movement
    gsap.to(textRef.current, {
      backgroundPosition: "200% center", // Moves the gradient
      duration: 6,
      repeat: -1,
      ease: "linear",
    });

    // Floating Effect
    gsap.to(textRef.current, {
      y: -5, 
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const buttons = document.querySelectorAll(".animated-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { scale: 1.1, boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.4)", duration: 0.2, ease: "power2.out" });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { scale: 1, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)", duration: 0.2, ease: "power2.in" });
      });
    });
  }, []);

  // Particle colors
  const colors = ["#6366F1", "#8B5CF6", "#A78BFA", "#EC4899", "#FACC15"]; // Indigo, Purple, Pink, Yellow
  const shapes = ["circle", "square", "triangle"];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              A Supportive Space for Your Mental Wellbeing
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Connect with certified professionals, access resources, and join a community that understands your journey.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {!currentUser ? (
                <>
                  <Link 
                    to="/register" 
                    className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md shadow-md hover:bg-indigo-50 transition duration-300 text-center animated-btn"
                    data-aos="zoom-in"
                  >
                    Get Started
                  </Link>
                  <Link 
                    to="/about" 
                    className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md
                    hover:bg-white hover:text-indigo-600 hover:bg-opacity-10 transition-all duration-300 ease-in-out text-center animated-btn"
                    data-aos="zoom-in"
                  >
                    Learn More
                  </Link>
                </>
              ) : (
                <Link 
                  to="/dashboard" 
                  className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md shadow-md hover:bg-indigo-50 transition duration-300 text-center hover:scale-105 hover:shadow-lg"
                  data-aos="zoom-in"
              >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Decorative Element */}
        <div className="hidden lg:block absolute right-0 bottom-0 w-1/3 h-full">
          <div className="w-full h-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-tl-3xl relative flex items-center justify-center overflow-hidden">
            
            {/* Render 15 Particles */}
            {[...Array(15)].map((_, i) => {
              const shape = shapes[Math.floor(Math.random() * shapes.length)]; // Random shape
              const size = Math.random() * 12 + 8; // Random size (8px - 20px)
              const color = colors[Math.floor(Math.random() * colors.length)]; // Random color

              return (
              <div
                key={i}
                ref={(el) => (particlesRef.current[i] = el)}
                className={`absolute ${shape === "circle" ? "rounded-full" : ""} ${
                  shape === "square" ? "rounded-md" : ""
                }`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  backgroundColor: color,
                  clipPath: shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
                  opacity: 0.7,
                }}
              ></div>
              );
            })}

            
            {/* Motivational Quote with Animation */}
            <p
              ref={textRef}
              className="absolute bottom-10 text-lg font-bold text-center opacity-90 bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #6366F1, #EC4899, #FACC15)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                display: "inline-block",
              }}
            >
              "Your mind is a universe. Let it shine."
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-in">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How MindfulConnect Helps</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to provide comprehensive support for your mental health journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
              <div className="text-indigo-500 mb-4">
                <FaHeartbeat className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Support</h3>
              <p className="text-gray-600">
                Tailored resources and recommendations based on your unique needs and preferences.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
              <div className="text-indigo-500 mb-4">
                <FaUsers className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Professionals</h3>
              <p className="text-gray-600">
                Connect with licensed mental health experts who have been thoroughly vetted.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
              <div className="text-indigo-500 mb-4">
                <FaLock className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy & Security</h3>
              <p className="text-gray-600">
                Your information is protected with enterprise-grade security and strict privacy controls.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
              <div className="text-indigo-500 mb-4">
                <FaBookReader className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rich Resources</h3>
              <p className="text-gray-600">
                Access a library of evidence-based articles, tools, and self-help materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="slide-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stories from Our Community</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from people who have found support through MindfulConnect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sarah M.</h4>
                  <p className="text-gray-500 text-sm">Member since 2023</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Finding a therapist who truly understood my anxiety was life-changing. The platform made it easy to connect with the right professional for my needs."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Michael K.</h4>
                  <p className="text-gray-500 text-sm">Member since 2022</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The resources available helped me understand what I was going through. I finally had names for my feelings and strategies to cope with them."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Jamie T.</h4>
                  <p className="text-gray-500 text-sm">Member since 2023</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As someone who was skeptical about online mental health support, I was surprised by how personal and effective the connections felt. It's made a real difference."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Wellness Journey Today</h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-3xl mx-auto">
            Take the first step toward better mental health with personalized support and resources.
          </p>
          {!currentUser ? (
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/register" 
                className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md shadow-md
                hover:bg-indigo-50 transition duration-300 text-center animated-btn"
              >
                Create Account
              </Link>
              <Link 
                to="/resources" 
                className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white
                hover:text-indigo-600 hover:bg-opacity-10 transition duration-300 text-center animated-btn"
              >
                Explore Resources
              </Link>
            </div>
          ) : (
            <Link 
              to="/dashboard" 
              className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md shadow-md hover:bg-indigo-50 transition duration-300 inline-block"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="slide-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with MindfulConnect is simple and straightforward.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and complete your profile to help us understand your needs and preferences.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Matched</h3>
              <p className="text-gray-600">
                Our system matches you with compatible professionals and relevant resources.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Begin Your Journey</h3>
              <p className="text-gray-600">
                Connect with professionals, access resources, and track your progress over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my information kept confidential?</h3>
              <p className="text-gray-600">
                Yes, we take privacy seriously. All personal information and conversations are encrypted and protected. We never share your data without your explicit consent.
              </p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How are professionals verified?</h3>
              <p className="text-gray-600">
                All mental health professionals on our platform undergo a thorough verification process, including license verification, credential checks, and background screening.
              </p>
            </div>
            
          {/* FAQ Item 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I need immediate help?</h3>
              <p className="text-gray-600">
                If you're experiencing a crisis or emergency, please call 911 or your local emergency number immediately. You can also call the National Suicide Prevention Lifeline at 988 for immediate support.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/resources/faq" 
              className="text-indigo-600 font-medium hover:text-indigo-500 transition duration-300 inline-flex items-center"
            >
              View all FAQs
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog/Articles Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="zoom-out-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
              <p className="text-xl text-gray-600">
                Insights and guidance from mental health experts
              </p>
            </div>
            <Link 
              to="/blog" 
              className="text-indigo-600 font-medium hover:text-indigo-500 transition duration-300 mt-4 md:mt-0 inline-flex items-center"
            >
              View all articles
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Mindfulness Meditation" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-indigo-600 font-medium mb-1">Self-Care</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">5 Mindfulness Practices for Daily Life</h3>
                <p className="text-gray-600 mb-4">
                  Simple techniques to bring awareness and calm to your everyday routines.
                </p>
                <Link 
                  to="/blog/mindfulness-practices" 
                  className="text-indigo-600 font-medium hover:text-indigo-500 transition duration-300"
                >
                  Read more →
                </Link>
              </div>
            </article>
            
            {/* Article 2 */}
            <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
              <img 
                src="https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Anxiety Management" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-indigo-600 font-medium mb-1">Anxiety</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Understanding and Managing Anxiety</h3>
                <p className="text-gray-600 mb-4">
                  Learn about the causes of anxiety and effective strategies to manage symptoms.
                </p>
                <Link 
                  to="/blog/managing-anxiety" 
                  className="text-indigo-600 font-medium hover:text-indigo-500 transition duration-300"
                >
                  Read more →
                </Link>
              </div>
            </article>
            
            {/* Article 3 */}
            <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
              <img 
                src="https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Healthy Relationships" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-indigo-600 font-medium mb-1">Relationships</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Building Healthier Relationships</h3>
                <p className="text-gray-600 mb-4">
                  Tips for improving communication and establishing boundaries in your relationships.
                </p>
                <Link 
                  to="/blog/healthy-relationships" 
                  className="text-indigo-600 font-medium hover:text-indigo-500 transition duration-300"
                >
                  Read more →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;