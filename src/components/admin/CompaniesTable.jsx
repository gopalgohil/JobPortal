import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
            <Table>
                <TableCaption>A list of your recently registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-6 py-3 text-left font-semibold text-gray-600">Logo</TableHead>
                        <TableHead className="px-6 py-3 text-left font-semibold text-gray-600">Name</TableHead>
                        <TableHead className="px-6 py-3 text-left font-semibold text-gray-600">Date</TableHead>
                        <TableHead className="px-6 py-3 text-right font-semibold text-gray-600">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <TableRow key={company._id} className="hover:bg-gray-100 transition-colors duration-200">
                                <TableCell className="px-6 py-4">
                                    <Avatar className="w-10 h-10 border-2 border-gray-300">
                                        <AvatarImage src={company.logo} alt="Company Logo" />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="px-6 py-4 text-gray-800 font-medium">{company.name}</TableCell>
                                <TableCell className="px-6 py-4 text-gray-500">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="px-6 py-4 text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <button className="text-gray-600 hover:text-blue-600 transition-colors">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white border border-gray-300 rounded-lg shadow-md">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-lg">
                                                <Edit2 className="w-4 h-4 text-gray-500" />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default CompaniesTable;
