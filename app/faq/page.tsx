"use client";
import Link from "next/link";


export default function FAQPage() {
  return (
     <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900">What is SaltCRM?</h3>
            <p className="text-sm text-gray-700">SaltCRM is a lightweight, easy-to-use customer relationship management tool designed for freelancers, contractors, and small service businesses who just need something that works — without the clutter.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">How is SaltCRM different from other CRMs?</h3>
            <p className="text-sm text-gray-700">We're built for simplicity. SaltCRM focuses only on the essentials — like client records, follow-up scheduling, and note-taking — with no extra bloat or steep learning curve.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Can I upgrade later?</h3>
            <p className="text-sm text-gray-700">Yes! You can start on the free plan and upgrade to Pro anytime from your dashboard.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Is there a contract?</h3>
            <p className="text-sm text-gray-700">Nope. You pay monthly, and you can cancel anytime. We keep things simple — just like our product.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Do I need to install anything?</h3>
            <p className="text-sm text-gray-700">Not at all. SaltCRM runs in your browser and works great on mobile too. Just log in and get started.</p>
          </div>
          <div className="mt-8">
              <Link href="/dashboard" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                ← Back to Dashboard
              </Link>
            </div>
        </div>
      </div>
  );
}