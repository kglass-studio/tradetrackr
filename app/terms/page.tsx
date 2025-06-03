export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Effective Date: June 1, 2025</p>

      <p className="mb-4">
        Welcome to SaltCRM. By accessing or using our services, you agree to be bound by the following terms. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Use of Service</h2>
      <p className="mb-4">
        SaltCRM is provided as-is for use by small businesses and independent contractors to manage client interactions. By using the platform,
        you confirm that you are at least 18 years old and legally authorized to enter into this agreement.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. User Accounts</h2>
      <p className="mb-4">
        You are responsible for maintaining the security of your login credentials. You agree not to share your account or allow unauthorized access.
        You are liable for all activity conducted under your account.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Free vs Paid Plans</h2>
      <p className="mb-4">
        SaltCRM offers a free tier with limited functionality. Upgrading to a paid plan enables additional features. Pricing and limits are subject to change with notice.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Data Ownership</h2>
      <p className="mb-4">
        You retain full ownership of your client data. SaltCRM only accesses your data to provide core functionality and does not sell or share your data with third parties.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Service Availability</h2>
      <p className="mb-4">
        While we aim for 99.9% uptime, SaltCRM may be unavailable during maintenance or unforeseen outages. We are not liable for data loss or downtime.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Termination</h2>
      <p className="mb-4">
        You may cancel at any time. We reserve the right to suspend or terminate accounts that violate these terms, abuse the system,
        or endanger our infrastructure or users.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Modifications</h2>
      <p className="mb-4">
        We may revise these Terms of Service from time to time. Continued use of the platform constitutes acceptance of any updates.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Contact</h2>
      <p className="mb-4">
        For support or questions about these terms, please contact us at:
        <br />
        📧 <a href="mailto:support@saltcrm.cloud" className="text-blue-600 underline">support@saltcrm.cloud</a>
      </p>
    </div>
  );
}
