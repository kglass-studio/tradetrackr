"use client";
import Link from "next/link";
const FeaturesPage = () => {
  return (
    <div className="flex-grow max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Features</h1>
      <ul className="space-y-6">
        <li>
          <h2 className="text-xl font-semibold">✅ Client Management</h2>
          <p className="text-sm text-gray-600">Add, update, and delete clients easily with an intuitive dashboard built for speed and clarity.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">📅 Follow-up Scheduling</h2>
          <p className="text-sm text-gray-600">Set next actions and follow-up dates using a streamlined calendar with customizable time intervals.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">📓 Client Notes</h2>
          <p className="text-sm text-gray-600">Keep notes for each client, including image uploads, to stay organized and informed.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">📊 Status Summary</h2>
          <p className="text-sm text-gray-600">View all clients at a glance by follow-up status: upcoming, overdue, completed, and more.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">🧼 Minimalist & Fast</h2>
          <p className="text-sm text-gray-600">No bloat. Just a clean interface built to load quickly and work smoothly on all devices.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">💬 Unlimited Edits & Support</h2>
          <p className="text-sm text-gray-600">Your subscription includes unlimited dashboard and website edits, plus direct 24/7 support.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">🔐 Privacy First</h2>
          <p className="text-sm text-gray-600">No ads, no tracking, and full ownership of your data. Always.</p>
        </li>
      </ul>
      <div className="mt-8">
              <Link href="/dashboard" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                ← Back to Dashboard
              </Link>
            </div>
    </div>
            
  );
};
     
export default FeaturesPage;
