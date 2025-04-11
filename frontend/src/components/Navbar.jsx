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

    const isActiveLink = (path) => location.pathname === path ? 'text-white font-semibold' : 'text-gray-200 hover:text-white';

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
            isScrolled 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-500'
        }`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#7c3aed,#4f46e5)] bg-[length:200%_100%] animate-gradient"></div>
            
            <div className='relative flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6'>
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <h1 className='text-2xl font-bold text-white'>
                        Job<span className='text-indigo-200'>Portal</span>
                    </h1>
                </Link>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white'
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center justify-center flex-1'>
                    <ul className='flex font-medium items-center gap-8'>
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
                    </ul>
                </div>

                {/* Desktop Auth Buttons */}
                <div className='hidden md:flex items-center gap-3'>
                    {!user ? (
                        <>
                            <Link to="/login">
                                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white transition-colors">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 transition-colors">
                                    Signup
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="flex items-center gap-2 cursor-pointer group">
                                    <Avatar className="ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                                    </Avatar>
                                    <div className="hidden md:block text-left">
                                        <p className="text-white font-medium group-hover:text-white/90 transition-colors">
                                            {user?.fullname}
                                        </p>
                                        <p className="text-xs text-white/70 group-hover:text-white/80 transition-colors">
                                            {user?.role === 'student' ? 'Student' : 'Recruiter'}
                                        </p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-white/70 group-hover:text-white/90 transition-colors group-hover:translate-x-0.5" />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0 rounded-xl shadow-2xl border border-gray-100" align="end">
                                <div className='flex gap-4 items-center p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50/50'>
                                    <Avatar className="h-14 w-14 ring-4 ring-white shadow-lg">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-semibold text-gray-900 text-lg'>{user?.fullname}</h4>
                                        <p className='text-sm text-gray-500 mt-1'>{user?.profile?.bio || 'No bio yet'}</p>
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
                                                className="w-full justify-start gap-3 hover:bg-indigo-50/80 hover:text-indigo-600 transition-all duration-200 group relative overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 to-indigo-50/0 group-hover:from-indigo-50/50 group-hover:to-indigo-50/50 transition-all duration-300"></div>
                                                <User2 className="h-5 w-5 transition-transform group-hover:scale-110 relative z-10" />
                                                <span className="relative z-10 font-medium">View Profile</span>
                                                <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 relative z-10" />
                                            </Button>
                                        </Link>
                                    )}
                                    <Button 
                                        onClick={logoutHandler} 
                                        variant="ghost" 
                                        className="w-full justify-start gap-3 text-red-600 hover:bg-red-50/80 transition-all duration-200 group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-50/0 to-red-50/0 group-hover:from-red-50/50 group-hover:to-red-50/50 transition-all duration-300"></div>
                                        <LogOut className="h-5 w-5 transition-transform group-hover:scale-110 relative z-10" />
                                        <span className="relative z-10 font-medium">Logout</span>
                                        <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 relative z-10" />
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
                isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`} onClick={() => setIsMenuOpen(false)} />

            {/* Mobile Menu */}
            <div className={`fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-indigo-600 to-purple-600 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <Link to="/" className="flex items-center">
                            <h1 className='text-2xl font-bold text-white'>
                                Job<span className='text-indigo-200'>Portal</span>
                            </h1>
                        </Link>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className="flex-1 flex flex-col items-center justify-center py-8">
                        {user && (
                            <div className="flex flex-col items-center mb-8">
                                <Avatar className="h-20 w-20 ring-4 ring-white/20 mb-4">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                                </Avatar>
                                <h3 className="text-xl font-semibold text-white mb-1">{user?.fullname}</h3>
                                <p className="text-indigo-200 mb-4">{user?.role === 'student' ? 'Student' : 'Recruiter'}</p>
                                <Link 
                                    to="/profile"
                                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <User2 className="h-5 w-5" />
                                    View Profile
                                </Link>
                            </div>
                        )}

                        <ul className='w-full space-y-4'>
                            <li>
                                <Link 
                                    to="/" 
                                    className={`flex items-center justify-center py-4 w-full transition-all duration-200 text-xl ${
                                        isActiveLink('/') 
                                            ? 'bg-white/10 text-white font-semibold' 
                                            : 'text-white/80 hover:text-white hover:bg-white/5'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/jobs" 
                                    className={`flex items-center justify-center py-4 w-full transition-all duration-200 text-xl ${
                                        isActiveLink('/jobs') 
                                            ? 'bg-white/10 text-white font-semibold' 
                                            : 'text-white/80 hover:text-white hover:bg-white/5'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Jobs
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/browse" 
                                    className={`flex items-center justify-center py-4 w-full transition-all duration-200 text-xl ${
                                        isActiveLink('/browse') 
                                            ? 'bg-white/10 text-white font-semibold' 
                                            : 'text-white/80 hover:text-white hover:bg-white/5'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Browse
                                </Link>
                            </li>
                        </ul>

                        {!user ? (
                            <div className="mt-8 flex flex-col gap-4 w-full px-4">
                                <Link 
                                    to="/login" 
                                    className="w-full text-center py-3 rounded-lg border-2 border-white text-white hover:bg-white/10 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/signup" 
                                    className="w-full text-center py-3 rounded-lg bg-white text-indigo-600 hover:bg-white/90 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Signup
                                </Link>
                            </div>
                        ) : (
                            <button 
                                onClick={() => {
                                    logoutHandler();
                                    setIsMenuOpen(false);
                                }}
                                className="mt-8 flex items-center gap-2 px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                            >
                                <LogOut className="h-5 w-5" />
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;