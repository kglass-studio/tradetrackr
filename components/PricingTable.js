import { ArrowRightIcon } from '@heroicons/react/24/solid'; // If you want to use this icon in the buttons

const PricingTable = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-lg text-gray-500">
            Start for free, pay only when your business grows.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {/* Free Plan Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900">Free</h3>
            <p className="mt-4 text-gray-600">Perfect for getting started.</p>
            <div className="mt-6">
              <span className="text-4xl font-extrabold text-gray-900">$0</span>
              <span className="text-base font-medium text-gray-500">/forever</span> {/* Changed /month to /forever */}
            </div>
            <ul role="list" className="mt-6 space-y-4">
  <li className="flex items-center">
    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span className="ml-3 text-gray-600">Up to 5 Clients</span>
  </li>
  <li className="flex items-center">
    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span className="ml-3 text-gray-600">Complete Client Management</span>
  </li>
  <li className="flex items-center">
    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span className="ml-3 text-gray-600">Job Notes (text-based)</span>
  </li>
  <li className="flex items-center">
    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span className="ml-3 text-gray-600">Job Status Tracking</span>
  </li>
  <li className="flex items-center">
    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span className="ml-3 text-gray-600">Follow-Up Reminders</span>
  </li>
</ul>
            <a href="#" className="mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium text-white bg-blue-500 hover:bg-blue-600">
  Get Started
</a>
          </div>

          {/* Pro Plan Card (with blue outline and "Most Popular" badge) */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-500 relative"> {/* Added relative for absolute positioning */}
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold rounded-tl-lg rounded-br-lg px-2 py-1">Most Popular</div>
            <h3 className="text-2xl font-bold text-blue-600">Pro</h3>
            <p className="mt-4 text-gray-600">Everything in Free, plus advanced features.</p>
            <div className="mt-6">
              <span className="text-4xl font-extrabold text-gray-900">$15</span>
              <span className="text-base font-medium text-gray-500">/month</span>
            </div>
            <ul role="list" className="mt-6 space-y-4">
  <li className="flex items-center">
    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span className="ml-3 text-gray-600">Unlimited Clients</span>
  </li>
  <li className="flex items-center">
    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span className="ml-3 text-gray-600">All features in Free plan</span>
  </li>
  <li className="flex items-center">
    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span className="ml-3 text-gray-600">Photo Uploads & Notes</span>
  </li>
  <li className="flex items-center">
    <span className="ml-3 text-gray-500 italic">Location Integration (coming soon)</span>
  </li>
  <li className="flex items-center">
    <span className="ml-3 text-gray-500 italic">Calendar Integration (coming soon)</span>
  </li>
</ul>
            <a
  href="https://payhip.com/order?link=aOYT4&pricing_plan=Q9zO4L0VBx"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium text-white bg-blue-500 hover:bg-blue-600"
>
  Upgrade to Pro
</a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;