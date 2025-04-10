import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Mail, 
    Phone, 
    MapPin, 
    Building2, 
    Briefcase, 
    Users, 
    HelpCircle 
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Careers', href: '/careers' },
            { name: 'ContactUS', href: '/contact' },
            { name: 'Blog', href: '/blog' },
        ],
        support: [
            { name: 'Help Center', href: '/help' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'FAQ', href: '/faq' },
        ],
        jobSeekers: [
            { name: 'Browse Jobs', href: '/jobs' },
            { name: 'Create Resume', href: '/resume' },
            { name: 'Job Alerts', href: '/alerts' },
            { name: 'Career Advice', href: '/advice' },
        ],
        employers: [
            { name: 'Post a Job', href: '/post-job' },
            { name: 'Recruitment', href: '/recruitment' },
            { name: 'Pricing', href: '/pricing' },
            { name: 'Employer Resources', href: '/resources' },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com' },
        { icon: Twitter, href: 'https://twitter.com' },
        { icon: Instagram, href: 'https://instagram.com' },
        { icon: Linkedin, href: 'https://linkedin.com' },
    ];

    const contactInfo = [
        { icon: Mail, text: 'support@jobportal.com' },
        { icon: Phone, text: '+1 (555) 123-4567' },
        { icon: MapPin, text: '123 Job Street, Career City, 12345' },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <Building2 className="h-8 w-8 text-indigo-400" />
                            <h3 className="text-2xl font-bold text-white">
                                Job<span className="text-indigo-400">Portal</span>
                            </h3>
                        </div>
                        <p className="text-gray-400 max-w-md mx-auto md:mx-0">
                            Connecting talented professionals with their dream careers. 
                            Your journey to success starts here.
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-full bg-gray-800 hover:bg-indigo-600 transition-colors duration-200"
                                >
                                    <social.icon className="h-5 w-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    className="group"
                                >
                                    <Link
                                        to={link.href}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center justify-center md:justify-start gap-2"
                                    >
                                        <span className="w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    className="group"
                                >
                                    <Link
                                        to={link.href}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center justify-center md:justify-start gap-2"
                                    >
                                        <span className="w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            {contactInfo.map((info, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center justify-center md:justify-start gap-3 text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                                >
                                    <info.icon className="h-5 w-5" />
                                    <span>{info.text}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>    
            
            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} JobPortal. All rights reserved.
                        </p>
                        <div className="flex items-center justify-center md:justify-end gap-6">
                            <Link
                                to="/privacy"
                                className="text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-200"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-200"
                            >
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