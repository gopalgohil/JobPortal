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
import { setLoading } from '@/redux/authSlice';
import { Loader2, User, Mail, Phone, Lock, Briefcase, GraduationCap, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const [errors, setErrors] = useState({});
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        if (!/^[A-Za-z][A-Za-z ]*$/.test(input.fullname)) {
            tempErrors.fullname = "Full name must start with a letter";
        }
        if (!/^[0-9]{10}$/.test(input.phoneNumber)) {
            tempErrors.phoneNumber = "Phone number must be exactly 10 digits";
        }
        if (!/(?=.*[@+*])(?=.{10,})/.test(input.password)) {
            tempErrors.password = "Password must be at least 10 characters and include @, +, or *";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).filter(key => tempErrors[key] !== "").length === 0;
    };

    const changeEventHandler = (e) => {
        if (e.target.name === "fullname" && /^[0-9]/.test(e.target.value)) {
            return;
        }
        if (e.target.name === "phoneNumber" && /[^0-9]/.test(e.target.value)) {
            return;
        }
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        Object.keys(input).forEach(key => {
            if (input[key]) {
                formData.append(key, input[key]);
            }
        });

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message, { style: { backgroundColor: 'green', color: 'white' } });
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <Navbar />
            <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] p-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='w-full max-w-md'
                >
                    <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>
                        <div className='text-center mb-8'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Create Account</h1>
                            <p className='text-gray-600'>Join our community and start your journey</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-6'>
                            {/* Full Name */}
                            <div className='space-y-2'>
                                <Label className="text-gray-700 font-medium">Full Name</Label>
                                <div className='relative'>
                                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                                    <Input
                                        type="text"
                                        value={input.fullname}
                                        name="fullname"
                                        onChange={changeEventHandler}
                                        placeholder="John Doe"
                                        className="pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                {errors.fullname && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className='text-red-500 text-sm'
                                    >
                                        {errors.fullname}
                                    </motion.p>
                                )}
                            </div>

                            {/* Email */}
                            <div className='space-y-2'>
                                <Label className="text-gray-700 font-medium">Email</Label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="example@gmail.com"
                                        className="pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className='space-y-2'>
                                <Label className="text-gray-700 font-medium">Phone Number</Label>
                                <div className='relative'>
                                    <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                                    <Input
                                        type="text"
                                        value={input.phoneNumber}
                                        name="phoneNumber"
                                        onChange={changeEventHandler}
                                        placeholder="8080808080"
                                        className="pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                {errors.phoneNumber && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className='text-red-500 text-sm'
                                    >
                                        {errors.phoneNumber}
                                    </motion.p>
                                )}
                            </div>

                            {/* Password */}
                            <div className='space-y-2'>
                                <Label className="text-gray-700 font-medium">Password</Label>
                                <div className='relative'>
                                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                                    <Input
                                        type="password"
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className="pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className='text-red-500 text-sm'
                                    >
                                        {errors.password}
                                    </motion.p>
                                )}
                            </div>

                            {/* Role Selection */}
                            <div className='space-y-4'>
                                <Label className="text-gray-700 font-medium">Select Role</Label>
                                <div className='grid grid-cols-2 gap-4'>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                                            input.role === 'student'
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-indigo-200'
                                        }`}
                                    >
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="absolute opacity-0 cursor-pointer"
                                        />
                                        <div className='flex items-center gap-3'>
                                            <GraduationCap className='h-6 w-6 text-indigo-500' />
                                            <Label className="cursor-pointer">Student</Label>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                                            input.role === 'recruiter'
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-indigo-200'
                                        }`}
                                    >
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="absolute opacity-0 cursor-pointer"
                                        />
                                        <div className='flex items-center gap-3'>
                                            <Briefcase className='h-6 w-6 text-indigo-500' />
                                            <Label className="cursor-pointer">Recruiter</Label>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Profile Picture Upload */}
                            <div className='space-y-2'>
                                <Label className="text-gray-700 font-medium">Profile Picture</Label>
                                <div className='relative'>
                                    <Upload className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                                    <Input
                                        accept="image/*"
                                        type="file"
                                        onChange={changeFileHandler}
                                        className="pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                {loading ? (
                                    <Button className="w-full bg-indigo-500 text-white py-6">
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                        Creating Account...
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6"
                                    >
                                        Create Account
                                    </Button>
                                )}
                            </motion.div>

                            {/* Login Link */}
                            <p className='text-center text-gray-600'>
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className='text-indigo-600 hover:text-indigo-700 font-medium hover:underline'
                                >
                                    Sign In
                                </Link>
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup; 