import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import { Briefcase, Code2, Palette, Database, Network } from 'lucide-react';

const categories = [
    {
        name: "Frontend Developer",
        icon: Code2,
        color: "from-blue-500 to-blue-600"
    },
    {
        name: "Backend Developer",
        icon: Database,
        color: "from-green-500 to-green-600"
    },
    {
        name: "Data Science",
        icon: Network,
        color: "from-purple-500 to-purple-600"
    },
    {
        name: "Graphic Designer",
        icon: Palette,
        color: "from-pink-500 to-pink-600"
    },
    {
        name: "FullStack Developer",
        icon: Briefcase,
        color: "from-indigo-500 to-indigo-600"
    }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Browse by Category
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover opportunities in your field of expertise
                    </p>
                </motion.div>

                <Carousel 
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {categories.map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <CarouselItem 
                                    key={category.name}
                                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="h-full"
                                    >
                                        <Button
                                            onClick={() => searchJobHandler(category.name)}
                                            className="w-full h-24 rounded-xl bg-gradient-to-r hover:shadow-lg 
                                                     transition-all duration-300 group relative overflow-hidden"
                                            variant="outline"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                                 style={{ background: `linear-gradient(to right, ${category.color.split(' ')[1]}, ${category.color.split(' ')[3]})` }}
                                            />
                                            
                                            <div className="flex flex-col items-center justify-center gap-2 relative z-10">
                                                <Icon className={`h-6 w-6 text-${category.color.split(' ')[1].split('-')[1]}-600 
                                                              group-hover:scale-110 transition-transform duration-300`}
                                                />
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 
                                                             transition-colors duration-300 text-center px-2">
                                                    {category.name}
                                                </span>
                                            </div>
                                        </Button>
                                    </motion.div>
                            </CarouselItem>
                            );
                        })}
                </CarouselContent>
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <CarouselPrevious className="static bg-white border-gray-200 hover:bg-gray-50 
                                                   transition-colors duration-200" />
                        <CarouselNext className="static bg-white border-gray-200 hover:bg-gray-50 
                                               transition-colors duration-200" />
                    </div>
            </Carousel>
            </div>
        </div>
    );
}

export default CategoryCarousel;