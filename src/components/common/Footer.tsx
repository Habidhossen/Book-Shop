"use client";

import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-16">
      <div className="px-4 md:px-28 lg:px-28">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:md:grid-cols-3 gap-8">
          {/* Get in Touch Section */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Get in Touch</h5>
            <div className="bottom-line-theme"></div>
            <div className="space-y-2">
              <p className="flex items-center">
                <MapPin className="text-green-500 mr-2" />
                Rangunia, Chattogram
              </p>
              <p className="flex items-center">
                <Phone className="text-green-500 mr-2" />
                +880123456
              </p>
              <p className="flex items-center">
                <Mail className="text-green-500 mr-2" />
                example@gmail.com
              </p>
              <p className="flex items-center">
                <Globe className="text-green-500 mr-2" />
                www.example.com
              </p>
            </div>
          </div>

          {/* social links */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Useful Links</h5>
            <div className="bottom-line-theme"></div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Admission
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe and Connect With Us */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Subscribe Us</h5>
            <div className="bottom-line-theme"></div>

            <form className="flex items-center mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="p-[10px] border-none focus:outline-none text-heading"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-4 py-[10px] hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500 duration-300"
              >
                Subscribe
              </button>
            </form>

            <h5 className="text-lg font-semibold mb-4">Connect With Us</h5>
            <div className="bottom-line-theme"></div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="#"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-100 py-4 text-center mt-16">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Book Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
