import React, { useState } from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button'
import { Briefcase, Building2, MapPin, Clock, DollarSign, Users } from 'lucide-react'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    const [isMobileView, setIsMobileView] = useState(false);

    // Toggle between card and table view on mobile
    const toggleView = () => setIsMobileView(!isMobileView);

    const CardView = () => (
        <div 
            onClick={()=> navigate(`/description/${job._id}`)} 
            className='p-6 rounded-xl shadow-lg bg-white border border-gray-100 cursor-pointer my-6 
                     transition-all duration-300 ease-in-out
                     hover:shadow-2xl hover:border-indigo-100 hover:scale-[1.02]
                     active:scale-[0.98]'
        >
            <div className='flex items-center justify-between mb-4'>
                <div>
                    <h1 className='font-semibold text-xl text-gray-800'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500 mt-1'>India</p>
                </div>
                <div className='text-right'>
                    <p className='text-sm text-gray-500'>Posted recently</p>
                </div>
            </div>
            
            <div className='space-y-3'>
                <h1 className='font-bold text-2xl text-gray-800 hover:text-indigo-600 transition-colors duration-300'>{job?.title}</h1>
                <p className='text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            
            <div className='flex flex-wrap items-center gap-3 mt-6'>
                <Badge 
                    className='px-4 py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 
                             transition-colors duration-300 font-medium' 
                    variant="ghost"
                >
                    {job?.position} Positions
                </Badge>
                <Badge 
                    className='px-4 py-1.5 text-red-700 bg-red-50 hover:bg-red-100 
                             transition-colors duration-300 font-medium' 
                    variant="ghost"
                >
                    {job?.jobType}
                </Badge>
                <Badge 
                    className='px-4 py-1.5 text-purple-700 bg-purple-50 hover:bg-purple-100 
                             transition-colors duration-300 font-medium' 
                    variant="ghost"
                >
                    {job?.salary}LPA
                </Badge>
            </div>
        </div>
    );

    const TableView = () => (
        <div className="w-full overflow-x-auto">
            <Table className="w-full">
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="font-semibold">Company</TableHead>
                        <TableHead className="font-semibold">Position</TableHead>
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Salary</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow 
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => navigate(`/description/${job._id}`)}
                    >
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-gray-500" />
                                {job?.company?.name}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-gray-500" />
                                {job?.title}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge 
                                className='text-red-700 bg-red-50 hover:bg-red-100 
                                         transition-colors duration-300 font-medium' 
                                variant="ghost"
                            >
                                {job?.jobType}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-gray-500" />
                                {job?.salary}LPA
                            </div>
                        </TableCell>
                        <TableCell>
                            <Button 
                                variant="ghost" 
                                className="text-indigo-600 hover:text-indigo-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/description/${job._id}`);
                                }}
                            >
                                View Details
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );

    return (
        <div className="w-full">
            {/* View Toggle Button - Only visible on mobile */}
            <div className="md:hidden flex justify-end mb-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleView}
                    className="text-sm"
                >
                    {isMobileView ? 'Card View' : 'Table View'}
                </Button>
            </div>

            {/* Responsive Content */}
            <div className="hidden md:block">
                <CardView />
            </div>
            <div className="md:hidden">
                {isMobileView ? <TableView /> : <CardView />}
            </div>
        </div>
    );
}

export default LatestJobCards;