import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, Download } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white shadow-xl border border-gray-200 rounded-2xl my-20 p-8 transition-all duration-300 hover:shadow-2xl'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-6'>
                        <Avatar className="h-32 w-32 ring-4 ring-indigo-500 shadow-lg transition-transform duration-300 hover:scale-105">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-3xl text-gray-800 mb-2'>{user?.fullname}</h1>
                            <p className='text-gray-600 text-lg'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => setOpen(true)} 
                        variant="outline" 
                        className="border-gray-300 hover:bg-indigo-50 hover:border-indigo-500 transition-all duration-300"
                    >
                        <Pen className='h-5 w-5 mr-2' />
                        Edit Profile
                    </Button>
                </div>
                <div className='my-8 border-t pt-6'>
                    <div className='flex items-center gap-3 my-3 text-gray-700 hover:text-indigo-600 transition-colors duration-300'>
                        <Mail className='text-indigo-600' />
                        <span className="text-lg">{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-3 text-gray-700 hover:text-indigo-600 transition-colors duration-300'>
                        <Contact className='text-indigo-600' />
                        <span className="text-lg">{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-8'>
                    <h1 className='font-semibold text-xl text-gray-800 mb-4'>Skills</h1>
                    <div className='flex flex-wrap gap-3 mt-2'>
                        {user?.profile?.skills.length !== 0 ? 
                            user?.profile?.skills.map((item, index) => (
                                <Badge 
                                    key={index} 
                                    className='bg-indigo-100 text-indigo-700 px-4 py-2 text-base hover:bg-indigo-200 transition-colors duration-300'
                                >
                                    {item}
                                </Badge>
                            )) 
                            : <span className='text-gray-500 text-lg'>No skills added yet</span>
                        }
                    </div>
                </div>
                <div className='mt-8'>
                    <Label className="text-lg font-bold text-gray-800 mb-2 block">Resume</Label>
                    {isResume ? (
                        <a 
                            target='_blank' 
                            href={user?.profile?.resume} 
                            className='inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors duration-300'
                        >
                            <Download className="h-5 w-5" />
                            <span className="text-lg">{user?.profile?.resumeOriginalName}</span>
                        </a>
                    ) : (
                        <span className='text-gray-500 text-lg'>No resume uploaded</span>
                    )}
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 mb-20 transition-all duration-300 hover:shadow-2xl'>
                <h1 className='font-bold text-2xl text-gray-800 mb-6'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;