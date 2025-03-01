// src/components/pages/About.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt, 
  FaUserCheck, 
  FaHandHoldingHeart, 
  FaUniversalAccess,
  FaLightbulb
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Our Mission and Vision
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              MindfulConnect was created with a simple but powerful vision: to make quality mental health support accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                alt="Team meeting" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                MindfulConnect began in 2022 when our founder, Dr. Emily Chen, recognized a critical gap in mental healthcare: despite increasing awareness, many people still faced significant barriers to accessing quality support.
              </p>
              <p className="text-gray-600 mb-4">
                Having worked as a clinical psychologist for over a decade, Dr. Chen understood that technology could bridge this gap—creating a secure, accessible platform where individuals could connect with verified professionals and evidence-based resources.
              </p>
              <p className="text-gray-600">
                Today, MindfulConnect has grown into a comprehensive mental health platform serving thousands of individuals on their wellness journeys, while maintaining our core values of accessibility, quality, and compassion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at MindfulConnect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-indigo-500 mb-4">
                <FaHandHoldingHeart className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compassion</h3>
              <p className="text-gray-600">
                We approach every interaction with empathy and understanding, recognizing that each person's journey is unique and deserving of respect.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-indigo-500 mb-4">
                <FaUniversalAccess className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">
                We believe quality mental health support should be available to everyone, regardless of location, background, or circumstances.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-indigo-500 mb-4">
                <FaUserCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                We maintain rigorous standards for our professionals and resources, ensuring evidence-based approaches and verified credentials.
              </p>
            </div>
            
            {/* Value 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-indigo-500 mb-4">
                <FaShieldAlt className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Privacy</h3>
              <p className="text-gray-600">
                We safeguard your information with the highest security standards and are committed to transparency in all our practices.
              </p>
            </div>
            
            {/* Value 5 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-indigo-500 mb-4">
                <FaLightbulb className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously evolve our platform, incorporating new research and technologies to better serve our community's needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals behind MindfulConnect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
      <div className="text-center">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
          alt="Dr. Emily Chen" 
          className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-900">Dr. Emily Chen</h3>
        <p className="text-indigo-600 mb-2">Founder & CEO</p>
        <p className="text-gray-600 px-4">
          Clinical Psychologist with over 15 years of experience, passionate about making mental healthcare accessible to all.
        </p>
      </div>
      
      {/* Team Member 2 */}
      <div className="text-center">
        <img 
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
          alt="Michael Rodriguez" 
          className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-900">Michael Rodriguez</h3>
        <p className="text-indigo-600 mb-2">Chief Technology Officer</p>
        <p className="text-gray-600 px-4">
          Tech innovator with expertise in secure healthcare platforms and AI-driven solutions for mental health.
        </p>
      </div>
      
      {/* Team Member 3 */}
      <div className="text-center">
        <img 
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
          alt="Dr. Aisha Johnson" 
          className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-900">Dr. Aisha Johnson</h3>
        <p className="text-indigo-600 mb-2">Clinical Director</p>
        <p className="text-gray-600 px-4">
          Psychiatrist specializing in trauma and resilience, leads our clinical standards and professional verification.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Impact Section */}
<section className="py-16 md:py-24 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="md:flex md:items-center md:space-x-12">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
        <p className="text-gray-600 mb-4">
          Since our founding, MindfulConnect has helped over 50,000 individuals access quality mental health support and resources.
        </p>
        <p className="text-gray-600 mb-4">
          We've facilitated more than 200,000 therapy sessions and provided over 1 million hours of support through our platform.
        </p>
        <p className="text-gray-600 mb-6">
          Our network includes 2,500+ verified mental health professionals across diverse specialties, ensuring users can find the right match for their needs.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center w-32">
            <p className="text-3xl font-bold text-indigo-600">50K+</p>
            <p className="text-gray-600 text-sm">Users Helped</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center w-32">
            <p className="text-3xl font-bold text-indigo-600">200K+</p>
            <p className="text-gray-600 text-sm">Sessions</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center w-32">
            <p className="text-3xl font-bold text-indigo-600">2.5K+</p>
            <p className="text-gray-600 text-sm">Professionals</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/2">
        <img 
          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
          alt="Impact visualization" 
          className="rounded-xl shadow-lg w-full h-auto"
        />
      </div>
    </div>
  </div>
</section>

{/* Join Us CTA */}
<section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of Our Mission</h2>
    <p className="text-xl mb-8 text-indigo-100 max-w-3xl mx-auto">
      Whether you're seeking support or are a mental health professional, join us in creating a more accessible and compassionate approach to mental wellness.
    </p>
    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
      <Link 
        to="/register" 
        className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-md shadow-md hover:bg-indigo-50 transition duration-300 text-center"
      >
        Join as a User
      </Link>
      <Link 
        to="/register?role=professional" 
        className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition duration-300 text-center"
      >
        Join as a Professional
      </Link>
    </div>
  </div>
</section>

{/* FAQ Section */}
<section className="py-16 md:py-20 bg-white">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
      <p className="text-gray-600">
        Common questions about MindfulConnect and our approach
      </p>
    </div>
    
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">How does MindfulConnect verify professionals?</h3>
        <p className="text-gray-600">
          We have a rigorous verification process that includes license verification, credential checks, background screening, and professional reference checks. All professionals must meet our quality standards before joining the platform.
        </p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Is MindfulConnect a replacement for traditional therapy?</h3>
        <p className="text-gray-600">
          MindfulConnect is designed to complement traditional therapy by making it more accessible. Our platform connects you with licensed professionals who provide real therapy services through secure video sessions. However, some situations may require in-person care, and our professionals can help determine what's best for your needs.
        </p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">How do you protect user privacy?</h3>
        <p className="text-gray-600">
          Privacy is our priority. We use bank-level encryption, secure data storage, and strict access controls. All professionals adhere to confidentiality standards, and our platform is fully HIPAA compliant. You control what information is shared and with whom.
        </p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">What makes MindfulConnect different from other platforms?</h3>
        <p className="text-gray-600">
          Our holistic approach combines professional therapy, peer support, self-help resources, and progress tracking in one integrated platform. We focus on quality through rigorous professional verification and evidence-based resources, while maintaining accessibility through various support options at different price points.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Contact Section */}
<section className="py-16 md:py-24 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="md:flex md:items-center md:justify-between">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-4">
          Have questions about MindfulConnect or want to learn more? Our team is here to help.
        </p>
        
        <div className="space-y-4 mt-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Email</p>
              <p className="text-gray-600">contact@mindfulconnect.com</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Phone</p>
              <p className="text-gray-600">+1 (800) 555-0123</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Address</p>
              <p className="text-gray-600">123 Wellness Street, Suite 100<br />San Francisco, CA 94103</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:w-1/2 md:pl-8">
        <form className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your email address"
            />
          </div>
          
          <div className="mb-4">
		  	<label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;