const FeaturesSection = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            All the tools you need, none of the complexity
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            Designed specifically for independent contractors and small service businesses.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1: Client Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* You can add an icon here later */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Client Management</h3>
            <p className="text-gray-700">Keep all your client information organized in one place. Add detailed profiles, contact info, and job histories.</p>
          </div>

          {/* Feature 2: Job Notes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* You can add an icon here later */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Notes</h3>
            <p className="text-gray-700">For each client, keep free-text notes and attach photos to job entries. Date-stamped for clarity.</p>
          </div>

          {/* Feature 3: Follow-Up Reminders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* You can add an icon here later */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow-Up Reminders</h3>
            <p className="text-gray-700">Schedule next steps with date/time and receive local notifications or email reminders.</p>
          </div>

          {/* Feature 4: Job Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* You can add an icon here later */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Status</h3>
            <p className="text-gray-700">Track the progress of your work with customizable statuses like "Lead," "Quoted," "Scheduled," "Completed," and "Paid."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;