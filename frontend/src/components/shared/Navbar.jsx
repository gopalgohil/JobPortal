import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, X, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    
    let lastScrollY = window.scrollY;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY = window.scrollY;

            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message, { style: {
                    backgroundColor: 'green',
                    color: 'white',
                }});
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const isActiveLink = (path) => location.pathname === path ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600';

    return (
        <nav className={`fixed top-0 w-full z-50 bg-white shadow-sm transition-all duration-300 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
            <div className='relative flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6'>
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <h1 className='text-2xl font-bold text-indigo-600'>
                        Job<span className='text-indigo-400'>Portal</span>
                    </h1>
                </Link>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600'
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center justify-center flex-1'>
                    <ul className='flex font-medium items-center gap-8'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/admin/companies" className={`transition-colors duration-200 ${isActiveLink('/admin/companies')}`}>
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs" className={`transition-colors duration-200 ${isActiveLink('/admin/jobs')}`}>
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className={`transition-colors duration-200 ${isActiveLink('/')}`}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className={`transition-colors duration-200 ${isActiveLink('/jobs')}`}>
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse" className={`transition-colors duration-200 ${isActiveLink('/browse')}`}>
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Desktop Auth Buttons */}
                <div className='hidden md:flex items-center gap-3'>
                    {!user ? (
                        <>
                            <Link to="/login">
                                <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                                    Signup
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="flex items-center gap-2 cursor-pointer group">
                                    <Avatar className="ring-2 ring-indigo-100 group-hover:ring-indigo-200 transition-all duration-300">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                                    </Avatar>
                                    <div className="hidden md:block text-left">
                                        <p className="text-gray-900 font-medium group-hover:text-indigo-600 transition-colors">
                                            {user?.fullname}
                                        </p>
                                        <p className="text-xs text-gray-500 group-hover:text-indigo-500 transition-colors">
                                            {user?.role === 'student' ? 'Student' : 'Recruiter'}
                                        </p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 transition-colors group-hover:translate-x-0.5" />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0 rounded-xl shadow-lg border border-gray-100" align="end">
                                <div className='flex gap-4 items-center p-6 border-b border-gray-100'>
                                    <Avatar className="h-14 w-14 ring-4 ring-white shadow-sm">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-semibold text-gray-900 text-lg'>{user?.fullname}</h4>
                                        <p className='text-sm text-gray-500 mt-1'>{user?.profile?.bio || 'Admin'}</p>
                                        <div className='flex items-center gap-2 mt-2'>
                                            <span className='px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full'>
                                                {user?.role === 'student' ? 'Student' : 'Recruiter'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 p-2'>
                                    {user?.role === 'student' && (
                                        <Link to="/profile">
                                            <Button 
                                                variant="ghost" 
                                                className="w-full justify-start gap-3 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                                            >
                                                <User2 className="h-5 w-5" />
                                                <span className="font-medium">View Profile</span>
                                            </Button>
                                        </Link>
                                    )}
                                    <Button 
                                        onClick={logoutHandler} 
                                        variant="ghost" 
                                        className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 transition-all duration-200"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span className="font-medium">Logout</span>
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-full bg-indigo-600 transition-all duration-300 md:hidden z-[60] ${
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-4 bg-indigo-600">
                        <Link to="/" className="flex items-center">
                            <h1 className='text-2xl font-bold text-white'>
                                Job<span className='text-indigo-300'>Portal</span>
                            </h1>
                        </Link>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 text-white"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className="flex-1 flex flex-col justify-between p-4 bg-white">
                        <div className="space-y-4">
                            {user && (
                                <div className='flex flex-col items-center gap-4 p-4 bg-indigo-600 rounded-xl'>
                                    <div className="flex flex-col items-center gap-3">
                                        <Avatar className="h-20 w-20 ring-4 ring-indigo-700 rounded-full">
                                            <AvatarImage 
                                                src={user?.profile?.profilePhoto} 
                                                alt="User Avatar"
                                                className="rounded-full object-cover"
                                            />
                                        </Avatar>
                                        <div className="text-center">
                                            <h4 className='font-semibold text-white text-xl'>{user?.fullname}</h4>
                                            <p className='text-sm text-indigo-300 mt-1'>{user?.profile?.bio || 'User'}</p>
                                            <div className='flex items-center justify-center gap-2 mt-2'>
                                                <span className='px-3 py-1 text-xs font-medium bg-indigo-700 text-white rounded-full'>
                                                    {user?.role === 'student' ? 'Student' : 'Recruiter'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <ul className='space-y-4 flex flex-col items-center'>
                                <li className="w-full">
                                    <Link 
                                        to="/" 
                                        className={`flex items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                                            isActiveLink('/') 
                                                ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/20' 
                                                : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                                        }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link 
                                        to="/jobs" 
                                        className={`flex items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                                            isActiveLink('/jobs') 
                                                ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/20' 
                                                : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                                        }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Jobs
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link 
                                        to="/browse" 
                                        className={`flex items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                                            isActiveLink('/browse') 
                                                ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/20' 
                                                : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                                        }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Browse
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Mobile Menu Footer */}
                        <div className="space-y-4">
                            {!user ? (
                                <div className='flex flex-col gap-4 items-center'>
                                    <Link to="/login" className="w-full">
                                        <Button 
                                            variant="outline" 
                                            className="w-full h-12 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup" className="w-full">
                                        <Button 
                                            className="w-full h-12 bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all duration-300"
                                        >
                                            Signup
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className='space-y-4 flex flex-col items-center'>
                                    {user?.role === 'student' && (
                                        <Link to="/profile" className="w-full">
                                            <Button 
                                                variant="outline" 
                                                className="w-full h-12 justify-center gap-3 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                                            >
                                                <User2 className="h-5 w-5" />
                                                <span>View Profile</span>
                                            </Button>
                                        </Link>
                                    )}
                                    <Button 
                                        onClick={logoutHandler} 
                                        variant="outline" 
                                        className="w-full h-12 justify-center gap-3 text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span>Logout</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;