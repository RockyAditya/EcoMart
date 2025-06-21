
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart
} from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', path: '/products' },
        { name: 'Home & Garden', path: '/products' },
        { name: 'Personal Care', path: '/products' },
        { name: 'Kitchen', path: '/products' },
      ]
    },
    {
      title: 'Learn',
      links: [
        { name: 'Sustainability Blog', path: '/blog' },
        { name: 'Eco Tips', path: '/blog' },
        { name: 'Product Guides', path: '/blog' },
        { name: 'Green Living', path: '/blog' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Shipping Info', path: '/shipping' },
        { name: 'Returns', path: '/returns' },
        { name: 'FAQ', path: '/faq' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-white/20 rounded-full"
              >
                <Leaf className="h-8 w-8 text-green-300" />
              </motion.div>
              <span className="text-3xl font-bold text-white">EcoShop</span>
            </Link>
            
            <p className="text-green-100 mb-6 leading-relaxed">
              Your trusted partner in sustainable living. We curate the finest eco-friendly products 
              to help you make a positive impact on our planet, one purchase at a time.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-300" />
                <span className="text-green-100">hello@ecoshop.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-300" />
                <span className="text-green-100">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-300" />
                <span className="text-green-100">123 Green Street, Eco City, EC 12345</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-green-100 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-green-700">
          <div className="max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">
              Stay Updated on Sustainable Living
            </h3>
            <p className="text-green-100 mb-4">
              Get eco-tips, product updates, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-green-600 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button className="px-6 py-2 bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-green-700 bg-green-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-green-100">
              <span>© 2024 EcoShop. Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>for our planet.</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-green-300" />
                </motion.a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-green-100">
              <Link to="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
