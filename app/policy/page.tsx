export default function PolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At SaltCRM, your privacy is important to us. This Privacy Policy outlines the types of personal information we collect and how we use, share, and protect that information.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Account information (email address, name, etc.)</li>
        <li>Client data you enter into the app</li>
        <li>Usage data for product improvements</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
      <p className="mb-4">
        We use your information to operate SaltCRM, provide customer support, and improve the service. We never sell your data.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Your Choices</h2>
      <p className="mb-4">
        You may request data deletion by contacting us at <a href="mailto:support@saltcrm.cloud" className="underline text-blue-600">support@saltcrm.cloud</a>.
      </p>
      <p className="text-sm text-gray-500 mt-8">
        Last updated: June 2, 2025
      </p>
    </main>
  );
}
