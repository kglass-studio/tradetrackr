"use client";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">About SaltCRM</h1>
      <div className="space-y-6">
        <p>
          SaltCRM was created by a small team of developers and support specialists who were tired of bloated, expensive CRM tools that didn’t work well for freelancers and small service businesses. We believe simple is powerful.
        </p>
        <p>
          Our mission is to make client management effortless — whether you’re a solo operator or a growing small business. SaltCRM is designed to be intuitive, mobile-friendly, and reliable with just the tools you need — and none of the ones you don’t.
        </p>
        <p>
          We’re a family-run team based in the U.S., passionate about helping other independent workers thrive. When you use SaltCRM, you’re not just a user — you’re a partner in keeping things lean, effective, and client-focused.
        </p>
        <p>
          Got feedback? We’re always listening. Reach out anytime at <a href="mailto:support@saltcrm.cloud" className="underline text-blue-600">support@saltcrm.cloud</a>.
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

export default AboutPage;
