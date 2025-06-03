"use client";
import Link from "next/link";

const ContactPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <div className="space-y-6">
        <p>
          Need help, have a question, or just want to say hi? We'd love to hear from you.
        </p>
        <p>
          You can reach us directly at:
        </p>
        <ul className="list-disc list-inside">
          <li>Email: <a href="mailto:support@saltcrm.cloud" className="underline text-blue-600">support@saltcrm.cloud</a></li>
        </ul>
        <p>
          We’re a small team, so we may not respond instantly — but we *always* respond.
        </p>
        <p>
          If you're experiencing a technical issue, please include as many details as possible (what page you're on, what action you were trying to take, and any screenshots if applicable).
        </p>
        <p>
          Thanks for being part of SaltCRM!
        </p>
        <div className="mt-8">
              <Link href="/dashboard" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                ← Back to Dashboard
              </Link>
            </div>
      </div>
    </div>
  );
};

export default ContactPage;
