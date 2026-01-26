import React from 'react';
import Header from '../Components/Area_banner';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
 
export default function AboutPage() {
  const features = [
    { title: 'Automate Workflows', description: 'Create automated workflows by connecting your favorite services with simple actions and reactions.' },
    { title: 'Easy Integration', description: 'Connect over 6 popular apps seamlessly without writing a single line of code.' },
    { title: 'Real-Time Updates', description: 'Stay in sync with instant updates and notifications for all your connected services.' },
  ];
 
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAFA]">
      <Header />
      <div className="mt-8 mb-20">
        <Navbar />
      </div>
 
      <main className="flex-1 px-8 md:px-16 lg:px-24 py-12 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B264F] mb-6">About AREA</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-12">
          AREA is a powerful automation platform that helps you connect your favorite apps and streamline your workflows. With AREA, repetitive tasks become automatic, giving you more time to focus on what matters.
        </p>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((f) => (
            <div key={f.title} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#576CA8] hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-[#576CA8] mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
 
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#1B264F] mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Our mission is to empower individuals and businesses to automate repetitive tasks, increase productivity, and achieve seamless integration between all the tools they use.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            AREA is built for simplicity, flexibility, and reliability. Our goal is to make automation accessible to everyone, whether you are a small business owner, a developer, or just someone looking to save time.
          </p>
        </section>
 
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#1B264F] mb-6">Get Started Quickly</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#E8ECF8] p-6 rounded-xl shadow">
              <h3 className="font-bold text-[#576CA8] mb-2">Step 1: Create an Account</h3>
              <p className='text-[#1B264F]'>Sign up quickly using your email and start exploring the AREA platform.</p>
            </div>
            <div className="bg-[#E8ECF8] p-6 rounded-xl shadow">
              <h3 className="font-bold text-[#576CA8] mb-2">Step 2: Connect to your services</h3>
              <p className='text-[#1B264F]'>Choose your favorite apps and services to integrate into your workflows.</p>
            </div>
            <div className="bg-[#E8ECF8] p-6 rounded-xl shadow">
              <h3 className="font-bold text-[#576CA8] mb-2">Step 3: Automate</h3>
              <p className='text-[#1B264F]'>Set up your first automation and let AREA handle repetitive tasks for you.</p>
            </div>
            <div className="bg-[#E8ECF8] p-6 rounded-xl shadow">
              <h3 className="font-bold text-[#576CA8] mb-2">Step 4: Monitor & Optimize</h3>
              <p className='text-[#1B264F]'>Track performance and tweak your workflows to achieve maximum efficiency.</p>
            </div>
          </div>
        </section>
      </main>
 
      <Footer />
    </div>
  );
}
