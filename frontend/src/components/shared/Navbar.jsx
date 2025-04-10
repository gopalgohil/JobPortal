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
            <div className={`fixed inset-0 bg-white transition-opacity duration-300 md:hidden ${
                isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <Link to="/" className="flex items-center">
                            <h1 className='text-2xl font-bold text-indigo-600'>
                                Job<span className='text-indigo-400'>Portal</span>
                            </h1>
                        </Link>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <ul className='space-y-2'>
                            <li>
                                <Link 
                                    to="/" 
                                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                                        isActiveLink('/') 
                                            ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/jobs" 
                                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                                        isActiveLink('/jobs') 
                                            ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Jobs
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/browse" 
                                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                                        isActiveLink('/browse') 
                                            ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Browse
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="p-4 border-t">
                        {!user ? (
                            <div className='flex flex-col gap-3'>
                                <Link to="/login">
                                    <Button 
                                        variant="outline" 
                                        className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button 
                                        className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                                    >
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className='space-y-2'>
                                {user?.role === 'student' && (
                                    <Link to="/profile">
                                        <Button 
                                            variant="outline" 
                                            className="w-full justify-start gap-3 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                                        >
                                            <User2 className="h-5 w-5" />
                                            <span>View Profile</span>
                                        </Button>
                                    </Link>
                                )}
                                <Button 
                                    onClick={logoutHandler} 
                                    variant="outline" 
                                    className="w-full justify-start gap-3 text-red-600 border-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;