import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div className="bg-blue-500 py-20"> {/* Changed py-12 to py-20 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to simplify your contracting business?
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-blue-100 sm:mt-4">
          Start for free today, no credit card required.
        </p>
        <div className="mt-8">
          <Button className="bg-white text-blue-500 font-bold py-3 px-6 rounded-md shadow-lg hover:bg-blue-100">
            Get Started Free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;