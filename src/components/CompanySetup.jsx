import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileText, Upload, Save } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { motion } from 'framer-motion'
import { Textarea } from '../ui/textarea'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.name.trim()) {
            toast.error("Company name is required");
            return;
        }

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message, {
                    style: { backgroundColor: 'green', color: 'white' }
                });
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong", {
                style: { backgroundColor: 'red', color: 'white' }
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    {/* Header Section */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/admin/companies")}
                            className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </motion.button>
                        <div>
                            <h1 className='text-2xl font-bold text-gray-900'>Company Setup</h1>
                            <p className='text-gray-500 mt-1'>Update your company profile information</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <form onSubmit={submitHandler} className="space-y-6">
                            {/* Company Name */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Building2 className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <Label className="text-lg font-medium text-gray-900">Company Name</Label>
                                </div>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    placeholder="Enter your company name"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <FileText className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <Label className="text-lg font-medium text-gray-900">Description</Label>
                                </div>
                                <Textarea
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 min-h-[100px]"
                                    placeholder="Tell us about your company..."
                                />
                            </div>

                            {/* Website */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Globe className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <Label className="text-lg font-medium text-gray-900">Website</Label>
                                </div>
                                <Input
                                    type="url"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    placeholder="https://your-company.com"
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <MapPin className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <Label className="text-lg font-medium text-gray-900">Location</Label>
                                </div>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                    placeholder="Enter company location"
                                />
                            </div>

                            {/* Logo Upload */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Upload className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <Label className="text-lg font-medium text-gray-900">Company Logo</Label>
                                </div>
                                <div className="relative">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 cursor-pointer"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Recommended: Square image, at least 400x400px
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="pt-4"
                            >
                                {loading ? (
                                    <Button
                                        disabled
                                        className="w-full bg-indigo-500 text-white py-6"
                                    >
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                        Updating...
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <Save className="h-5 w-5" />
                                        Update Company Profile
                                    </Button>
                                )}
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CompanySetup; 