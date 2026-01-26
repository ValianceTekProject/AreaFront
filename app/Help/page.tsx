import React from 'react';
import Header from '../Components/Area_banner';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
 
export default function HelpPage() {
  const faqs = [
    { q: "How do I create a new Area?", a: "Click 'Create Area' on your dashboard, select your action and reaction, then save." },
    { q: "Can I connect multiple services?", a: "Yes! You can connect as many services as you like to automate your workflows." },
    { q: "Is AREA free to use?", a: "AREA offers a free tier with limited automations. Premium features require a subscription." },
    { q: "How do I delete an Area?", a: "Click the trash icon on any Area in your dashboard to remove it permanently." },
  ];
 
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAFA]">
      <Header />
      <div className="mt-8 mb-20">
        <Navbar />
      </div>
 
      <main className="flex-1 px-8 md:px-16 lg:px-24 py-12 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B264F] mb-6">Help Center</h1>
        <p className="text-gray-700 text-lg mb-12">
          Find answers to common questions, guides, and tutorials to help you get the most out of AREA.
        </p>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#576CA8] hover:shadow-xl transition-shadow">
              <h3 className="font-bold text-[#576CA8] mb-2">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
 
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-[#1B264F] mb-6">Still Need Help?</h2>
          <p className="text-gray-700 mb-4">
            If you can't find the answer to your question, contact our support team directly via the <a href="/contact" className="text-[#576CA8] font-semibold underline">Contact page</a>.
          </p>
        </section>
      </main>
 
      <Footer />
    </div>
  );
}
