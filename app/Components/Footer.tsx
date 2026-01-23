import React from 'react';
import { useRouter } from 'next/navigation';
 
const Footer = () => {
  const router = useRouter();
 
  const footerSections = [
    {
      title: 'ABOUT',
      links: [
        { label: 'About AREA', path: '/about' },
        { label: 'Documentation', path: '/docs' },
        { label: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'LEGAL',
      links: [
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Privacy Policy', path: '/privacy' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'API Documentation', path: '/api-docs' },
        { label: 'Community', path: '/community' },
      ],
    },
  ];
 
  return (
    <footer className="w-full bg-[#1B264F] py-12 px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
                <h3 className="text-white text-lg font-bold mb-4 uppercase">
                    AREA
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                    Connect your favorite services together and automate your workflow with simple actions and reactions.
                </p>
                <div className="mt-6">
                    <img src="Area_logo.png" alt="Logo" className="h-10 w-auto" />
                </div>
            </div>
 
            {footerSections.map((section) => (
                <div key={section.title} className="col-span-1">
                <h3 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">
                    {section.title}
                </h3>
                <div className="flex flex-col gap-3">
                    {section.links.map((link) => (
                    <button
                        key={link.label}
                        onClick={() => router.push(link.path)}
                        className="text-gray-300 text-sm hover:text-white transition-colors text-left"
                    >
                        {link.label}
                    </button>
                    ))}
                </div>
                </div>
            ))}
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;