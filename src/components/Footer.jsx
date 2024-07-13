import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import necessary icons from react-icons library

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          {/* First Column (Service Hot-line) */}
          <div className="sm:col-span-1">
            <h3 id="service-hotline" className="text-lg font-bold mb-3">Service hot-line</h3>
            <ul className="text-sm text-gray-200 leading-6">
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>1-800-123-4567</li>
              <li>1-800-987-6543</li>
        
              <li className="mt-3">Monday - Friday</li>
              <li>8:00 - 12:00 Uhr</li>
              <li>8:00 - 12:00 Uhr</li>
            </ul>
          </div>

          {/* Third Column (Our Company) */}
          <div className="sm:col-span-1">
            <h3 id="our-company" className="text-lg font-bold mb-3">Our Company</h3>
            <ul className="text-sm text-gray-200 leading-6">
              <li><a href="#" className="text-white hover:underline">About Us</a></li>
              <li><a href="#" className="text-white hover:underline">Contact Us</a></li>
              <li><a href="#" className="text-white hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="text-white hover:underline">Terms of Use</a></li>
            </ul>
            <div className="flex justify-center sm:justify-start space-x-4 mt-4">
              <a href="#" className="text-gray-200 hover:text-gray-300">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-200 hover:text-gray-300">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-200 hover:text-gray-300">
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
