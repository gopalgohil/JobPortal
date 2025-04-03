import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { motion } from 'framer-motion'
import { Building2, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Please enter a company name");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message, {
                    style: { backgroundColor: 'green', color: 'white' }
                });
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong", {
                style: { backgroundColor: 'red', color: 'white' }
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8'>
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
                            <h1 className='text-2xl font-bold text-gray-900'>Create New Company</h1>
                            <p className='text-gray-500 mt-1'>Set up your company profile to get started</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="space-y-6">
                            {/* Company Name Section */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Building2 className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <Label className="text-lg font-medium text-gray-900">Company Name</Label>
                                </div>
                                <p className="text-sm text-gray-500 pl-11">
                                    Choose a name for your company. You can modify this later in your company settings.
                                </p>
                            </div>

                            {/* Input Field */}
                            <div className="relative">
                                <Input
                                    type="text"
                                    className="pl-4 pr-4 py-3 text-lg border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                                    placeholder="e.g., JobHunt, Microsoft, Google"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className='flex items-center gap-4 pt-4'>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate("/admin/companies")}
                                        className="px-6 py-2 border-gray-200 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </Button>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        onClick={registerNewCompany}
                                        disabled={loading || !companyName.trim()}
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                Continue
                                                <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                        <h3 className="text-sm font-medium text-indigo-900 mb-2">Tips for choosing a company name:</h3>
                        <ul className="space-y-2 text-sm text-indigo-700">
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500">•</span>
                                Choose a name that reflects your company's identity and values
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500">•</span>
                                Make it memorable and easy to pronounce
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500">•</span>
                                Consider how it will look in your company's branding
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CompanyCreate;