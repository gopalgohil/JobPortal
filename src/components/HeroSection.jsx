import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Search, Briefcase, Building2, Users, TrendingUp } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import useCountAnimation from '@/hooks/useCountAnimation';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Animated counts
    const activeJobsCount = useCountAnimation(10000);
    const companiesCount = useCountAnimation(500);
    const candidatesCount = useCountAnimation(50000);
    const successRateCount = useCountAnimation(95);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        // Intersection Observer for animation trigger
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
        };
    }, []);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    }

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K+';
        }
        return num + '+';
    };

    return (
        <div className='relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 my-5'>
            {/* Animated Background Elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                {/* Gradient Orbs */}
                <div 
                    className='absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob'
                    style={{
                        transform: `translate(${(mousePosition.x - window.innerWidth/2) * 0.05}px, ${(mousePosition.y - window.innerHeight/2) * 0.05}px)`
                    }}
                ></div>
                <div 
                    className='absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-300 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000'
                    style={{
                        transform: `translate(${(mousePosition.x - window.innerWidth/2) * 0.03}px, ${(mousePosition.y - window.innerHeight/2) * 0.03}px)`
                    }}
                ></div>
                <div 
                    className='absolute top-40 left-40 w-96 h-96 bg-gradient-to-br  to-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000'
                    style={{
                        transform: `translate(${(mousePosition.x - window.innerWidth/2) * 0.04}px, ${(mousePosition.y - window.innerHeight/2) * 0.04}px)`
                    }}
                ></div>

                {/* Animated Grid */}
                <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]'></div>

                {/* Floating Particles */}
                <div className='absolute inset-0'>
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className='absolute w-2 h-2 bg-white rounded-full opacity-20'
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${5 + Math.random() * 5}s infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className='container mx-auto px-4 py-16 relative z-10'>
                <div className='flex flex-col items-center gap-6 max-w-4xl mx-auto'>
                    {/* Badge */}
                    <span className='inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/80 backdrop-blur-sm text-indigo-700 font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300'>
                        <TrendingUp className='h-4 w-4' />
                        No. 1 Job Hunt Website
                    </span>

                    {/* Main Heading */}
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center leading-tight'>
                        Search, Apply & <br />
                        Get Your <span className='text-indigo-600 relative'>
                            Dream Jobs
                            <span className='absolute -bottom-2 left-0 w-full h-2 bg-indigo-200 rounded-full'></span>
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className='text-lg text-gray-600 text-center max-w-2xl leading-relaxed'>
                        Discover thousands of job opportunities with all the information you need. Your future career starts here.
                    </p>

                    {/* Search Bar */}
                    <div className='w-full max-w-2xl mt-4'>
                        <div className='flex flex-col sm:flex-row gap-4 p-1 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300'>
                    <input
                        type="text"
                                placeholder='Find your dream jobs...'
                                value={query}
                        onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className='flex-1 px-6 py-2 outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 text-lg'
                    />
                            <Button 
                                onClick={searchJobHandler} 
                                className='px-8 py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all duration-300 flex items-center gap-2'
                            >
                        <Search className='h-5 w-5' />
                                Search
                    </Button>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 w-full max-w-4xl stats-section'>
                        {[
                            { 
                                icon: Briefcase, 
                                color: 'indigo', 
                                text: 'Active Jobs', 
                                value: isVisible ? formatNumber(activeJobsCount) : '0+',
                                delay: 0
                            },
                            { 
                                icon: Building2, 
                                color: 'purple', 
                                text: 'Companies', 
                                value: isVisible ? formatNumber(companiesCount) : '0+',
                                delay: 200
                            },
                            { 
                                icon: Users, 
                                color: 'pink', 
                                text: 'Candidates', 
                                value: isVisible ? formatNumber(candidatesCount) : '0+',
                                delay: 400
                            },
                            { 
                                icon: TrendingUp, 
                                color: 'blue', 
                                text: 'Success Rate', 
                                value: isVisible ? `${successRateCount}%` : '0%',
                                delay: 600
                            }
                        ].map((stat, index) => (
                            <div 
                                key={index} 
                                className='text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'
                                style={{
                                    animation: isVisible ? `fadeInUp 0.5s ease-out ${stat.delay}ms forwards` : 'none'
                                }}
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${stat.color}-100 text-${stat.color}-600 mb-2`}>
                                    <stat.icon className='h-6 w-6' />
                                </div>
                                <h3 className='text-2xl font-bold text-gray-900'>{stat.value}</h3>
                                <p className='text-gray-600'>{stat.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection