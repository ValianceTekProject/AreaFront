"use client"
import React from 'react';
import Header from '../Components/Area_banner';
import Navbar from '../Components/Navbar';
import ActionBox from '../Components/ActionBox';
import Footer from '../Components/Footer';
import { Edit, Search } from 'lucide-react';

const MainPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAFA]">
       <Header />
        <div className="w-full py-5 px-8 bg-cover bg-center bg-no-repeat rounded-b-[50px]" style={{ backgroundImage: 'url(Home_background.jpg)' }}>
            <div className="mb-20">
                <Navbar />
            </div>
            <div className="max-w-4xl mx-auto text-center mb-25">
                <h1 className="text-white text-4xl font-bold">
                    Explore an entire universe of actions and reactions
                </h1>
            </div>
        </div>
        <main className="py-12">
                <div className="mb-12">
                    <h2 className="text-[#576CA8] text-4xl font-bold mb-16 ml-24">
                        Explanation :
                    </h2>
                    <div className="space-y-4 text-gray-700 text-2xl leading-relaxed max-w-6xl mx-auto">
                        <p className="text-center">
                            The AREA website is an automation platform that connects different online services together.
                        </p>
                        <p className="text-center mb-16">
                            Users create simple rules by linking an Action (something that happens) to a Reaction (something to do). When the action occurs, the reaction is automatically triggered, similar to IFTTT or Zapier.
                        </p>
                    </div>
                </div>
                <div className="mb-12">
                    <h2 className="text-[#576CA8] text-4xl font-bold mb-16 ml-24">
                        Explore the possibilities :
                    </h2>
                    <div className="flex gap-35 justify-center flex-wrap">
                        <ActionBox
                            icon={<Edit size={48} />}
                            text="Make a lot of new action and reactions. Explore all the possibilities"
                            path="/Dashboard"
                        />
                        <ActionBox
                            icon={<Search size={48} />}
                            text="Go see every services you currently are on and enjoy all the new possibilities"
                            path="/Services"
                        />
                    </div>
                </div>
        </main>

      <Footer />
    </div>
  );
};

export default MainPage;