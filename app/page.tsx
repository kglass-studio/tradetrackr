"use client";

import React from 'react';
import PricingTable from '@/components/PricingTable';
import FeaturesSection from '@/components/FeaturesSection';
import CallToAction from '@/components/CallToAction';
//import Footer from '@/components/Footer';
import SecondaryHero from '@/components/SecondaryHero';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function HomePage() {
  const router = useRouter(); // Initialize useRouter here

  const handleSignUpClick = () => {
    console.log("Sign Up button clicked");
    router.push('/signup');
  };

  const handleLoginClick = () => {
    console.log("Login button clicked");
    router.push('/login');
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-center py-16 md:py-24 max-w-7xl mx-auto pl-4 md:pl-8 lg:pl-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight md:text-left mb-2">
          <span className="font-black italic text-blue-500 block text-5xl md:text-6xl -ml-1">SaltCRM</span>
          <span className="block text-2xl md:text-3xl">Manage Your Contracting</span>
          <span className="block text-black text-2xl md:text-3xl">Business Effortlessly</span>
        </h1>
        <p className="text-base text-gray-500 mt-4 mb-6">
          Client tracking, job notes, and follow-ups, all in one simple app.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleSignUpClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline flex items-center space-x-2"
          >
            Get Started Free
            <ArrowRightIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleLoginClick}
            className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-2 px-4 border border-blue-400 rounded-md focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </div>
      <div className="mt-8 md:mt-16">
        <SecondaryHero />
      </div>
      <div className="mt-8 md:mt-16">
        <PricingTable />
      </div>
      <div className="mt-8 md:mt-16">
        <FeaturesSection />
      </div>
      {/* Call To Action Section */}
      <CallToAction />
      {/* <Footer /> */}
    </div>
  );
}