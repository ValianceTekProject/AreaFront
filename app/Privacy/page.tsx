import React from 'react';
import Header from '../Components/Area_banner';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
 
export default function PrivacyPage() {
  const policies = [
    { title: "Data Collection", content: "We collect minimal data needed to provide our services. Your data is never sold to third parties." },
    { title: "Data Security", content: "All sensitive information is encrypted and stored securely." },
    { title: "Account Deletion", content: "You can request deletion of your account and all associated data at any time." },
    { title: "Cookies & Tracking", content: "Cookies are used for authentication, analytics, and to enhance user experience." },
  ];
 
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAFA]">
      <Header />
      <div className="mt-8 mb-20">
        <Navbar />
      </div>
 
      <main className="flex-1 px-8 md:px-16 lg:px-24 py-12 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B264F] mb-6">Privacy Policy</h1>
        <p className="text-gray-700 text-lg mb-12">
          Your privacy is important to us. AREA is committed to protecting your personal information.
        </p>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {policies.map((p, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#576CA8] hover:shadow-xl transition-shadow">
              <h3 className="font-bold text-[#576CA8] mb-2">{p.title}</h3>
              <p className="text-gray-700">{p.content}</p>
            </div>
          ))}
        </div>
 
        <section className="mt-16">
          <p className="text-gray-700">
            By using AREA, you agree to this Privacy Policy. For any concerns, contact our support team via the <a href="/contact" className="text-[#576CA8] font-semibold underline">Contact page</a>.
          </p>
        </section>
      </main>
 
      <Footer />
    </div>
  );
}
 