import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg p-6 bg-white shadow-lg rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <Label htmlFor="fullname" className="text-gray-700">Full Name</Label>
                        <Input id="fullname" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} className="w-full mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-gray-700">Email</Label>
                        <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} className="w-full mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="phoneNumber" className="text-gray-700">Phone Number</Label>
                        <Input id="phoneNumber" name="phoneNumber" type="text" value={input.phoneNumber} onChange={changeEventHandler} className="w-full mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="bio" className="text-gray-700">Bio</Label>
                        <Input id="bio" name="bio" type="text" value={input.bio} onChange={changeEventHandler} className="w-full mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="skills" className="text-gray-700">Skills (comma-separated)</Label>
                        <Input id="skills" name="skills" type="text" value={input.skills} onChange={changeEventHandler} className="w-full mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="file" className="text-gray-700">Resume (PDF)</Label>
                        <Input id="file" name="file" type="file" accept="application/pdf" onChange={fileChangeHandler} className="w-full mt-1" />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                            {loading ? <Loader2 className='mr-2 h-5 w-5 animate-spin' /> : 'Update'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;