const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
        {/* Product Column */}
        <div>
          <h6 className="font-semibold mb-2">Product</h6>
          <ul className="list-none space-y-1">
            <li><a href="#" className="hover:text-gray-300">Features</a></li>
            <li><a href="#" className="hover:text-gray-300">Pricing</a></li>
            <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
          </ul>
        </div>
        {/* Company Column */}
        <div>
          <h6 className="font-semibold mb-2">Company</h6>
          <ul className="list-none space-y-1">
            <li><a href="#" className="hover:text-gray-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            <li><a href="#" className="hover:text-gray-300">Blog</a></li>
          </ul>
        </div>
        {/* Legal Column */}
        <div>
          <h6 className="font-semibold mb-2">Legal</h6>
          <ul className="list-none space-y-1">
            <li><a href="#" className="hover:text-gray-300">Privacy</a></li>
            <li><a href="#" className="hover:text-gray-300">Terms</a></li>
          </ul>
        </div>
        {/* Connect Column */}
        <div>
          <h6 className="font-semibold mb-2">Connect</h6>
          <ul className="list-none space-y-1">
            <li><a href="#" className="hover:text-gray-300">Twitter</a></li>
            <li><a href="#" className="hover:text-gray-300">LinkedIn</a></li>
            <li><a href="#" className="hover:text-gray-300">Facebook</a></li>
          </ul>
        </div>
        {/* Copyright Section - Spanning all columns */}
        <div className="md:col-span-4 lg:col-span-4 mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} SaltCRM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;