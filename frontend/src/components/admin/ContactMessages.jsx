import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/contact/messages', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch messages');
            }

            const data = await response.json();
            
            if (data.success) {
                setMessages(data.messages);
            } else {
                throw new Error(data.message || 'Failed to fetch messages');
            }
        } catch (error) {
            console.error('Fetch messages error:', error);
            toast.error(error.message || 'Failed to fetch messages');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`/api/contact/messages/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update status');
            }
            
            const data = await response.json();
            
            if (data.success) {
                toast.success('Status updated successfully');
                fetchMessages();
            } else {
                throw new Error(data.message || 'Failed to update status');
            }
        } catch (error) {
            console.error('Update status error:', error);
            toast.error(error.message || 'Failed to update status');
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'read':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'replied':
                return <Mail className="h-5 w-5 text-blue-500" />;
            default:
                return <Clock className="h-5 w-5 text-yellow-500" />;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Messages</h2>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {messages.map((message) => (
                            <motion.tr
                                key={message._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusIcon(message.status)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.subject}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="max-w-xs truncate">{message.message}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(message.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <select
                                        value={message.status}
                                        onChange={(e) => updateStatus(message._id, e.target.value)}
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="read">Read</option>
                                        <option value="replied">Replied</option>
                                    </select>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactMessages; 