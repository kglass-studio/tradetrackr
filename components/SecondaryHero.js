import React from 'react';
import {
  UsersIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon, // Changed this line
  TagIcon,
  BellIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const SecondaryHero = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Manage Your Business Without the CRM Complexity
          </h2>
          <p className="mt-3 text-lg text-gray-500">
            Finally, a client and job management tool designed for your trade, without the overwhelming features and price tag of traditional CRMs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            {/* Table-like list */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="rounded-md bg-blue-100 p-2 mr-4">
                  <UsersIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Client Management</h3>
                  <p className="text-gray-600 text-sm">Keep all your client information organized in one place.</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-md bg-blue-100 p-2 mr-4">
                  <CalendarIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Job Scheduling</h3>
                  <p className="text-gray-600 text-sm">Schedule jobs with ease and set reminders.</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-md bg-blue-100 p-2 mr-4">
                  <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Task Tracking</h3>
                  <p className="text-gray-600 text-sm">Track your work from lead to payment.</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-md bg-blue-100 p-2 mr-4">
                  <TagIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Simple Pricing</h3>
                  <p className="text-gray-600 text-sm">Affordable plans that grow with you.</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-md bg-blue-100 p-2 mr-4">
                  <BellIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Follow-Up Reminders</h3>
                  <p className="text-gray-600 text-sm">Never let a potential lead slip through the cracks.</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="rounded-md bg-blue-100 p-2 mr-4">
                  <DocumentTextIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Job Notes</h3>
                  <p className="text-gray-600 text-sm">Keep detailed records of each job.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* Rounded square image placeholder */}
           <div className="bg-gray-200 rounded-xl aspect-w-1 aspect-h-1 min-h-96 shadow-lg flex items-center justify-center">
  <div className="text-gray-400">
    App Screenshot
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryHero;