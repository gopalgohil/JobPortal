import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2, Mail, Lock, User, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message, { style: {
                    backgroundColor: 'green',
                    color: 'white',
                }});
            }
        } catch (error) {
            toast.error(error.response.data.message, { style: { backgroundColor: 'red', color: 'white' } });
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Navbar />
            <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='w-full max-w-md'
                >
                    <div className='bg-white shadow-xl border border-gray-100 rounded-2xl p-8'>
                        <div className="text-center mb-8">
                            <h1 className='font-bold text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                                Welcome Back
                            </h1>
                            <p className="text-gray-600 mt-2">Sign in to your account</p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="font-medium text-gray-700">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="example@gmail.com"
                                        className="pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="font-medium text-gray-700">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="password"
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className="pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <Label className="font-medium text-gray-700">Select Role</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="peer sr-only"
                                            id="student"
                                        />
                                        <Label
                                            htmlFor="student"
                                            className="flex items-center justify-center gap-2 p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 hover:border-indigo-200"
                                        >
                                            <User className="h-5 w-5 text-gray-500 peer-checked:text-indigo-500" />
                                            <span className="font-medium">Student</span>
                                        </Label>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="peer sr-only"
                                            id="recruiter"
                                        />
                                        <Label
                                            htmlFor="recruiter"
                                            className="flex items-center justify-center gap-2 p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 hover:border-indigo-200"
                                        >
                                            <Building2 className="h-5 w-5 text-gray-500 peer-checked:text-indigo-500" />
                                            <span className="font-medium">Recruiter</span>
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            {loading ? (
                                <Button 
                                    disabled 
                                    className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
                                >
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Signing in...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    Sign In
                                </Button>
                            )}

                            <p className='text-sm text-center text-gray-600'>
                                Don't have an account?{' '}
                                <Link 
                                    to="/signup" 
                                    className='text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors'
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login; 