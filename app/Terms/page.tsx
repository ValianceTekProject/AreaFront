 import React from 'react';
import Header from '../Components/Area_banner';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
 
export default function TermsPage() {
  const sections = [
    { title: "Account Responsibility", content: "You are responsible for your account, login details, and activities performed using AREA." },
    { title: "Use of Services", content: "AREA provides automation tools. Misuse or illegal activities are strictly prohibited." },
    { title: "Limitation of Liability", content: "AREA is not liable for loss of data or service interruptions. Users act at their own risk." },
    { title: "Changes to Terms", content: "We may update terms periodically. Continued use of AREA constitutes acceptance." },
  ];
 
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAFA]">
      <Header />
      <div className="mt-8 mb-20">
        <Navbar />
      </div>
 
      <main className="flex-1 px-8 md:px-16 lg:px-24 py-12 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B264F] mb-6">Terms of Service</h1>
        <p className="text-gray-700 text-lg mb-12">Please read these terms carefully. By using AREA, you agree to the following conditions:</p>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((sec, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#576CA8] hover:shadow-xl transition-shadow">
              <h3 className="font-bold text-[#576CA8] mb-2">{sec.title}</h3>
              <p className="text-gray-700">{sec.content}</p>
            </div>
          ))}
        </div>
      </main>
 
      <Footer />
    </div>
  );
}
