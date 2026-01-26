import React from 'react';
import Header from '../Components/Area_banner';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
 
export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAFA]">
      <Header />
      <div className="mt-8 mb-20">
        <Navbar />
      </div>
 
      <main className="flex-1 px-8 md:px-16 lg:px-24 py-12 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B264F] mb-6">Contact Us</h1>
        <p className="text-gray-700 text-lg mb-12">
          Have questions, suggestions, or need help? Reach out to us through the form below and our team will get back to you promptly.
        </p>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#576CA8]">
            <h3 className="text-xl font-bold text-[#576CA8] mb-4">Support</h3>
            <p className="text-gray-700 mb-4">
              Email us at <span className="font-semibold">support@area.com</span> for assistance with your account or automations.
            </p>
            <p className="text-gray-700">
              For urgent issues, please include “URGENT” in the subject line.
            </p>
          </div>
 
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-500">
            <h3 className="text-xl font-bold text-green-500 mb-4">Sales & Partnerships</h3>
            <p className="text-gray-700 mb-4">
              Interested in collaborating with AREA or have a business inquiry? Email us at <span className="font-semibold">partnerships@area.com</span>.
            </p>
            <p className="text-gray-700">
              We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
 
        <section>
          <h2 className="text-3xl font-bold text-[#1B264F] mb-6">Send Us a Message</h2>
          <form className="grid grid-cols-1 gap-6 max-w-lg">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#576CA8] text-[#1B264F]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#576CA8] text-[#1B264F]"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#576CA8] text-[#1B264F]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#576CA8] text-white font-semibold rounded-full hover:bg-[#4a5d91] transition-colors"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
 
      <Footer />
    </div>
  );
}