"use client";


import Link from "next/link";

const PricingPage = () => {
  return (
    <div className="flex flex-col  text-gray-800">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Pricing</h1>
        <div className="max-w-3xl mx-auto space-y-6">
          <p>SaltCRM keeps it simple:</p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Free Plan:</strong> Includes up to 5 clients, all core CRM features, and unlimited follow-ups.
            </li>
            <li>
              <strong>Pro Plan:</strong> $15/month – Manage unlimited clients, customize follow-up intervals, and more coming soon!
            </li>
          </ul>
          <p>
            No contracts. Cancel anytime. We believe in software that works without bloat or confusion.
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default PricingPage;
