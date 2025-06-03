"use client";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white text-sm flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
        {/* Product Column */}
        <div>
          <h6 className="font-semibold mb-2">Product</h6>
          <ul className="list-none space-y-1">
            <li><a href="/features" className="hover:text-gray-300">Features</a></li>
            <li><a href="/pricing" className="hover:text-gray-300">Pricing</a></li>
            <li><a href="/faq" className="hover:text-gray-300">FAQ</a></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h6 className="font-semibold mb-2">Company</h6>
          <ul className="list-none space-y-1">
            <li><a href="/about" className="hover:text-gray-300">About</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            <li><a href="https://www.greatsaltlakewebdesign.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">Blog</a>
</li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h6 className="font-semibold mb-2">Legal</h6>
          <ul className="list-none space-y-1">
            <li><a href="/policy" className="hover:text-gray-300">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-gray-300">Terms</a></li>
          </ul>
        </div>
<div>
  <h6 className="font-semibold mb-2">Status</h6>
  <ul className="list-none space-y-1">
    <li className="text-gray-400 italic">No social media. Just code.</li>
  </ul>
</div>

        

        {/* Expanded Info Section */}
        <div className="md:col-span-4 lg:col-span-4 mt-8 text-center space-y-2">
          <p>&copy; {new Date().getFullYear()} SaltCRM. All rights reserved.</p>
          <p>
            Need help? Email us at{" "}
            <a href="mailto:support@saltcrm.cloud" className="underline text-blue-300">support@saltcrm.cloud</a>
          </p>
          <p>
            🏅 <strong>Legendary Status: testuser12</strong> – the first successful login and eternal QA hero 🥳
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
