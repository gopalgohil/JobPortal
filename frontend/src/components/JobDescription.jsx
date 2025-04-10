import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, Users, Calendar, Star } from 'lucide-react';
import Footer from './shared/Footer';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const [isHovered, setIsHovered] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, { style: { backgroundColor: 'red', color: 'white' } });
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Navbar />
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-4xl mx-auto my-20 p-8 bg-white shadow-xl rounded-2xl border border-gray-100'
            >
                <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
                    <div className='text-center md:text-left space-y-4'>
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className='font-bold text-3xl text-gray-900'
                        >
                            {singleJob?.title}
                        </motion.h1>
                        <div className='flex flex-wrap items-center gap-3 justify-center md:justify-start'>
                            <Badge 
                                className='px-4 py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 
                                         transition-colors duration-300 font-medium' 
                                variant="ghost"
                            >
                                <div className='flex items-center gap-1'>
                                    <Users className="h-3 w-3" />
                                    {singleJob?.postion} Positions
                                </div>
                            </Badge>
                            <Badge 
                                className='px-4 py-1.5 text-red-700 bg-red-50 hover:bg-red-100 
                                         transition-colors duration-300 font-medium' 
                                variant="ghost"
                            >
                                <div className='flex items-center gap-1'>
                                    <Briefcase className="h-3 w-3" />
                                    {singleJob?.jobType}
                                </div>
                            </Badge>
                            <Badge 
                                className='px-4 py-1.5 text-purple-700 bg-purple-50 hover:bg-purple-100 
                                         transition-colors duration-300 font-medium' 
                                variant="ghost"
                            >
                                <div className='flex items-center gap-1'>
                                    <DollarSign className="h-3 w-3" />
                                    {singleJob?.salary} LPA
                                </div>
                            </Badge>
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                            className={`rounded-xl px-8 py-6 text-white font-semibold transition-all duration-300 ${
                                isApplied 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg'
                            }`}
                        >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                    </motion.div>
                </div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className='border-b-2 border-gray-200 font-semibold text-xl py-6 text-gray-900 text-center md:text-left'
                >
                    Job Description
                </motion.h1>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className='mt-6 space-y-4'
                >
                    <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
                        <Briefcase className="h-5 w-5 text-indigo-600" />
                        <div>
                            <h1 className='font-semibold text-gray-900'>Role</h1>
                            <span className='text-gray-600'>{singleJob?.title}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
                        <MapPin className="h-5 w-5 text-indigo-600" />
                        <div>
                            <h1 className='font-semibold text-gray-900'>Location</h1>
                            <span className='text-gray-600'>{singleJob?.location}</span>
                        </div>
                    </div>
                    <div className='flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
                        <Star className="h-5 w-5 text-indigo-600 mt-1" />
                        <div>
                            <h1 className='font-semibold text-gray-900'>Description</h1>
                            <span className='text-gray-600'>{singleJob?.description}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
                        <Clock className="h-5 w-5 text-indigo-600" />
                        <div>
                            <h1 className='font-semibold text-gray-900'>Experience</h1>
                            <span className='text-gray-600'>{singleJob?.experience}1 yrs</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
                        <DollarSign className="h-5 w-5 text-indigo-600" />
                        <div>
                            <h1 className='font-semibold text-gray-900'>Salary</h1>
                            <span className='text-gray-600'>{singleJob?.salary} LPA</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
                        <Users className="h-5 w-5 text-indigo-600" />
                        <div>
                            <h1 className='font-semibold text-gray-900'>Total Applicants</h1>
                            <span className='text-gray-600'>{singleJob?.applications?.length}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
                        <Calendar className="h-5 w-5 text-indigo-600" />
                        <div>
                            <h1 className='font-semibold text-gray-900'>Posted Date</h1>
                            <span className='text-gray-600'>{singleJob?.createdAt?.split("T")[0]}</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            <Footer />
        </div>
    );
}

export default JobDescription;