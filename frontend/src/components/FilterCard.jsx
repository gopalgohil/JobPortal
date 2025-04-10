import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'
import { MapPin, Briefcase, DollarSign, ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
        icon: MapPin
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
        icon: Briefcase
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
        icon: DollarSign
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [expandedSections, setExpandedSections] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    const toggleSection = (filterType) => {
        setExpandedSections(prev => ({
            ...prev,
            [filterType]: !prev[filterType]
        }));
    };

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    const clearSearch = () => {
        setSearchQuery('');
    }

    useEffect(() => {
        // Combine search query and selected filter value
        const combinedQuery = searchQuery ? `${searchQuery} ${selectedValue}` : selectedValue;
        dispatch(setSearchedQuery(combinedQuery.trim()));
    }, [selectedValue, searchQuery, dispatch]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='w-full bg-white p-6 rounded-xl shadow-lg border border-gray-100 mt-6'
        >
            <h1 className='font-bold text-2xl text-gray-900 mb-6'>Filter Jobs</h1>
            
            {/* Search Input */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-10 pr-10"
                />
                {searchQuery && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={clearSearch}
                    >
                        <X className="h-4 w-4 text-gray-400" />
                    </Button>
                )}
            </div>

            <div className='space-y-6'>
                <RadioGroup 
                    value={selectedValue} 
                    onValueChange={changeHandler}
                    className="space-y-6"
                >
                    {filterData.map((data, index) => {
                        const Icon = data.icon;
                        const isExpanded = expandedSections[data.filterType] ?? true;
                        
                        return (
                            <motion.div 
                                key={data.filterType}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="space-y-4"
                            >
                                <button
                                    onClick={() => toggleSection(data.filterType)}
                                    className="flex items-center justify-between w-full group"
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="h-5 w-5 text-indigo-600" />
                                        <h2 className='font-semibold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors'>
                                            {data.filterType}
                                        </h2>
                                    </div>
                                    {isExpanded ? 
                                        <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" /> : 
                                        <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                                    }
                                </button>
                                
                                <motion.div
                                    initial={false}
                                    animate={{ 
                                        height: isExpanded ? "auto" : 0,
                                        opacity: isExpanded ? 1 : 0
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="space-y-3 pl-8">
                                        {data.array.map((item, idx) => {
                                            const itemId = `id${index}-${idx}`;
                                            return (
                                                <motion.div 
                                                    key={itemId}
                                                    whileHover={{ x: 5 }}
                                                    className='flex items-center space-x-3 group'
                                                >
                                                    <RadioGroupItem 
                                                        value={item} 
                                                        id={itemId}
                                                        className="border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <Label 
                                                        htmlFor={itemId}
                                                        className="text-gray-600 cursor-pointer group-hover:text-indigo-600 transition-colors"
                                                    >
                                                        {item}
                                                    </Label>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </RadioGroup>
            </div>

            {/* Reset Button */}
            {(selectedValue || searchQuery) && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => {
                        setSelectedValue('');
                        setSearchQuery('');
                    }}
                    className="mt-6 w-full py-2 px-4 text-sm font-medium text-indigo-600 bg-indigo-50 
                             rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                >
                    Reset All Filters
                </motion.button>
            )}
        </motion.div>
    );
}

export default FilterCard;