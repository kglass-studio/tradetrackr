const TestimonialsSection = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Trusted by contractors everywhere
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500">
            See what other contractors are saying about SaltCRM
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 italic mb-4">"This app has completely transformed how I manage my clients and jobs. Everything is in one place and so easy to use."</p>
            <div className="flex items-center">
              {/* Placeholder for avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Contractor Name</h4>
                <p className="text-xs text-gray-500">Service Business</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 italic mb-4">"Simple and effective. Just what I needed to keep track of my clients without all the extra fluff."</p>
            <div className="flex items-center">
              {/* Placeholder for avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Another Contractor</h4>
                <p className="text-xs text-gray-500">Another Business</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 italic mb-4">"The follow-up reminders have been a game-changer for me. I never miss a beat now!"</p>
            <div className="flex items-center">
              {/* Placeholder for avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Happy User</h4>
                <p className="text-xs text-gray-500">Their Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;