import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6'>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4"
            >
                <div className="flex items-center justify-center gap-3">
                    <Briefcase className="h-8 w-8 text-indigo-600" />
                    <h1 className='text-4xl font-bold'>
                        <span className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                            Latest & Top
                        </span>
                        <span className="text-gray-900"> Job Openings</span>
                    </h1>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Discover the most recent and sought-after opportunities in your field. 
                    Stay ahead with our curated selection of top positions.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8'
            >
                {allJobs.length <= 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full text-center py-12"
                    >
                        <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
                            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Available</h3>
                            <p className="text-gray-600">
                                We're currently updating our job listings. 
                                Please check back later for new opportunities.
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    allJobs?.slice(0,6).map((job, index) => (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <LatestJobCards job={job}/>
                        </motion.div>
                    ))
                )}
            </motion.div>

            {allJobs.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-center mt-8"
                >
                    <p className="text-gray-600">
                        Showing {Math.min(6, allJobs.length)} of {allJobs.length} available positions
                    </p>
                </motion.div>
            )}
        </div>
    )
}

export default LatestJobs;