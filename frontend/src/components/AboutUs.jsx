import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Target, Award, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Signup from './auth/Signup';
const AboutUs = () => {
    const stats = [
        { number: '10K+', label: 'Active Users', icon: Users },
        { number: '5K+', label: 'Companies', icon: Building2 },
        { number: '50K+', label: 'Jobs Posted', icon: Target },
        { number: '95%', label: 'Success Rate', icon: Award }
    ];

    const features = [
        {
            title: 'For Job Seekers',
            description: 'Find your dream job with our advanced search and matching algorithms.',
            icon: Users,
            color: 'from-blue-500 to-indigo-600'
        },
        {
            title: 'For Employers',
            description: 'Connect with top talent and streamline your hiring process.',
            icon: Building2,
            color: 'from-purple-500 to-pink-600'
        },
        {
            title: 'Our Mission',
            description: 'To bridge the gap between talent and opportunity, making job search seamless.',
            icon: Target,
            color: 'from-green-500 to-emerald-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Navbar />
            {/* Hero Section */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative py-20 overflow-hidden"
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#7c3aed,#4f46e5)] bg-[length:200%_100%] animate-gradient opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
                    <div className="text-center my-10">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                        >
                            About <span className="text-indigo-600">JobPortal</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl text-gray-600 max-w-3xl mx-auto"
                        >
                            Connecting talent with opportunity. We're revolutionizing the way people find jobs and companies hire talent.
                        </motion.p>
                    </div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="py-16 bg-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 * index }}
                                className="text-center p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 hover:shadow-lg transition-shadow"
                            >
                                <stat.icon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="py-16 bg-gray-50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We're committed to making your job search or hiring process as smooth as possible
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 * index }}
                                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 mb-6">{feature.description}</p>
                                <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700">
                                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Team Section */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="py-16 bg-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Meet the passionate team behind JobPortal
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "John Smith",
                                position: "CEO & Founder",
                                image: "profile_1.avif",
                                linkedin: "https://linkedin.com",
                                twitter: "https://twitter.com"
                            },
                            {
                                name: "Gopal Gohil",
                                position: "CTO",
                                image: "/profile.jpeg",
                                linkedin: "https://linkedin.com",
                                twitter: "https://twitter.com"
                            },
                            {
                                name: "Michael Brown",
                                position: "Head of Operations",
                                image: "profile_2.avif",
                                linkedin: "https://linkedin.com",
                                twitter: "https://twitter.com"
                            }
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 * index }}
                                className="text-center"
                            >
                          <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-indigo-100 flex items-center justify-center bg-gray-200">
                          <img 
    src={member.image} 
    alt={member.name}
    className="w-full h-[250px] object-cover object-top"
/>

</div>


                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-gray-600 mb-4">{member.position}</p>
                                <div className="flex justify-center space-x-4">
                                    <a 
                                        href={member.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                                    >
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                    </a>
                                    <a 
                                        href={member.twitter} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-indigo-600 transition-colors"
                                    >
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
                        Join thousands of job seekers and employers who have found success with JobPortal
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link 
                            to="/signup" 
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition-colors"
                        >
                            Sign Up Now
                        </Link>
                        <Link 
                            to="/contact" 
                            className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 md:py-4 md:text-lg md:px-10 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </motion.section>
            <Footer />  
        </div>
    );
};

export default AboutUs;
