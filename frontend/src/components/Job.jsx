import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Briefcase, Clock, Building2, DollarSign } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const [isHovered, setIsHovered] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    const handleSaveForLater = () => {
        if (!user) {
            navigate('/login');
        } else {
            // Handle save for later functionality for logged-in users
            setIsBookmarked(!isBookmarked);
        }
    }
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className='p-6 rounded-xl shadow-lg bg-white border border-gray-100 mt-20 cursor-pointer
                     transition-all duration-300 ease-in-out
                     hover:shadow-2xl hover:border-indigo-100 hover:scale-[1.02]
                     active:scale-[0.98] '
        >
            <div className='flex items-center justify-between '>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <Clock className="h-4 w-4" />
                    <p>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                </div>
                <Button 
                    variant="outline" 
                    className={`rounded-full transition-all duration-300 ${
                        isBookmarked ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' : 'hover:bg-gray-50'
                    }`} 
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleSaveForLater();
                    }}
                >
                    <Bookmark className={`h-4 w-4 transition-transform duration-300 ${
                        isBookmarked ? 'fill-current' : ''
                    }`} />
                </Button>
            </div>

            <div className='flex items-center gap-4 '>
                <div className='relative group'>
                    <Button 
                        className="p-6 rounded-xl transition-all duration-300 hover:bg-indigo-50" 
                        variant="outline" 
                        size="icon"
                    >
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </Button>
                    <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 
                                  bg-white px-2 py-1 rounded-md shadow-md text-xs
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                  whitespace-nowrap'>
                        View Company
                    </div>
                </div>
                <div>
                    <h1 className='font-semibold text-lg text-gray-900'>{job?.company?.name}</h1>
                    <div className='flex items-center gap-2 text-sm text-gray-500'>
                        <MapPin className="h-4 w-4" />
                        <p>India</p>
                    </div>
                </div>
            </div>

            <div className='space-y-3'>
                <h1 className='font-bold text-xl text-gray-900 hover:text-indigo-600 transition-colors duration-300'>
                    {job?.title}
                </h1>
                <p className='text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-3 mt-6'>
                <Badge 
                    className='px-4 py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 
                             transition-colors duration-300 font-medium' 
                    variant="ghost"
                >
                    <div className='flex items-center gap-1'>
                        {job?.position} Positions
                    </div>
                </Badge>
                <Badge 
                    className='px-4 py-1.5 text-red-700 bg-red-50 hover:bg-red-100 
                             transition-colors duration-300 font-medium' 
                    variant="ghost"
                >
                    <div className='flex items-center gap-1'>
                        <Briefcase className="h-3 w-3" />
                        {job?.jobType}
                    </div>
                </Badge>
                <Badge 
                    className='px-4 py-1.5 text-purple-700 bg-purple-50 hover:bg-purple-100 
                             transition-colors duration-300 font-medium' 
                    variant="ghost"
                >
                    <div className='flex items-center gap-1'>
                        <DollarSign className="h-3 w-3" />
                        {job?.salary}LPA
                    </div>
                </Badge>
            </div>

            <div className='flex items-center gap-4 mt-6'>
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outline"
                    className="flex-1 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-300"
                >
                    View Details
                </Button>
                <Button 
                    onClick={handleSaveForLater}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300"
                >
                    <Link to ='/Login'>Save For Letter</Link>
                </Button>
            </div>
        </motion.div>
    )
}

export default Job;