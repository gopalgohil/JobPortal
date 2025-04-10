import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Building2, Clock, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const Careers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);

    // Mock job data - replace with actual API call
    useEffect(() => {
        const mockJobs = [
            {
                id: 1,
                title: 'Senior Frontend Developer',
                company: 'TechCorp Inc.',
                location: 'San Francisco, CA',
                type: 'Full-time',
                salary: '$120k - $150k',
                posted: '2 days ago',
                description: 'We are looking for an experienced Frontend Developer to join our team...',
                requirements: ['5+ years of React experience', 'Strong TypeScript skills', 'Experience with modern frontend tools'],
            },
            {
                id: 2,
                title: 'Product Designer',
                company: 'DesignHub',
                location: 'Remote',
                type: 'Full-time',
                salary: '$90k - $110k',
                posted: '1 week ago',
                description: 'Join our design team to create beautiful and intuitive user experiences...',
                requirements: ['3+ years of UI/UX design', 'Figma expertise', 'Portfolio required'],
            },
            {
                id: 3,
                title: 'Backend Engineer',
                company: 'DataSystems',
                location: 'New York, NY',
                type: 'Full-time',
                salary: '$130k - $160k',
                posted: '3 days ago',
                description: 'Looking for a Backend Engineer to help scale our infrastructure...',
                requirements: ['5+ years of Node.js', 'Experience with microservices', 'AWS expertise'],
            },
            {
                id: 4,
                title: 'Marketing Manager',
                company: 'GrowthLabs',
                location: 'Chicago, IL',
                type: 'Part-time',
                salary: '$80k - $100k',
                posted: '5 days ago',
                description: 'Seeking a creative Marketing Manager to lead our campaigns...',
                requirements: ['4+ years of marketing experience', 'Digital marketing expertise', 'Team leadership'],
            },
            {
                id: 5,
                title: 'Data Scientist',
                company: 'AI Solutions',
                location: 'Boston, MA',
                type: 'Contract',
                salary: '$140k - $170k',
                posted: '1 day ago',
                description: 'Join our AI team to work on cutting-edge machine learning projects...',
                requirements: ['PhD in Computer Science', 'Python expertise', 'ML frameworks experience'],
            },
            {
                id: 6,
                title: 'DevOps Engineer',
                company: 'CloudTech',
                location: 'Austin, TX',
                type: 'Full-time',
                salary: '$110k - $140k',
                posted: '4 days ago',
                description: 'Looking for a DevOps Engineer to optimize our deployment pipeline...',
                requirements: ['3+ years of DevOps', 'Kubernetes expertise', 'CI/CD experience'],
            }
        ];
        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Filter jobs based on search criteria
        const filtered = jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                job.description.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
            const matchesType = !jobType || job.type.toLowerCase() === jobType.toLowerCase();

            return matchesSearch && matchesLocation && matchesType;
        });

        setFilteredJobs(filtered);
        setIsLoading(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <Navbar />
            <div className="relative py-32 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 "></div>
                <div className="relative max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 ">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center "
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Find Your Dream Job
                        </h1>
                        <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                            Discover thousands of job opportunities with all the information you need. It's your future.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Search Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white rounded-xl shadow-xl p-6 md:p-8"
                >
                    <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:flex md:space-x-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Job title, keywords, or company"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <Select value={jobType} onValueChange={setJobType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Job Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="full-time">Full-time</SelectItem>
                                    <SelectItem value="part-time">Part-time</SelectItem>
                                    <SelectItem value="contract">Contract</SelectItem>
                                    <SelectItem value="internship">Internship</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            type="submit"
                            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Searching...' : 'Search Jobs'}
                        </Button>
                    </form>
                </motion.div>
            </div>

            {/* Jobs List Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {filteredJobs.length} Jobs Found
                    </h2>
                    <div className="flex items-center space-x-2">
                        <Filter className="h-5 w-5 text-gray-500" />
                        <span className="text-sm text-gray-500">Filter Results</span>
                    </div>
                </div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {filteredJobs.map((job) => (
                        <motion.div
                            key={job.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <Building2 className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                                            <p className="text-sm text-gray-500">{job.company}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-600 rounded-full">
                                        {job.type}
                                    </span>
                                </div>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Briefcase className="h-4 w-4 mr-2" />
                                        {job.salary}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Clock className="h-4 w-4 mr-2" />
                                        {job.posted}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                                <div className="flex items-center justify-between">
                                    <Button
                                        variant="outline"
                                        className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                                    >
                                        View Details
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                        Apply Now
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                {filteredJobs.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>

            {/* Featured Companies Section */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Companies</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Join these amazing companies and take your career to the next level
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <Building2 className="h-8 w-8 text-indigo-600" />
                                </div>
                                <h3 className="text-center font-semibold text-gray-900">Company {i}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Careers;