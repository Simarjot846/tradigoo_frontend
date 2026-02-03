'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Camera, ShieldCheck, TrendingUp, Building2, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProfileHeaderProps {
    profile: any;
    onUpdate: () => void;
}

export function ProfileHeader({ profile, onUpdate }: ProfileHeaderProps) {
    const { user } = useAuth();
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) return;

            const file = event.target.files[0];

            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", user?.id || "");

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/profile/upload-avatar`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) throw new Error("Upload failed");

            toast.success("Profile photo updated!");
            onUpdate();
        } catch (err: any) {
            toast.error(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 p-8 backdrop-blur-xl overflow-hidden mb-8 shadow-sm dark:shadow-none transition-colors duration-300">

            <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">

                {/* Avatar Section */}
                <div className="relative group">
                    <Avatar className="w-32 h-32 border-4 border-white dark:border-zinc-950 relative shadow-xl">
                        <AvatarImage src={profile.profile_image_url} />
                        <AvatarFallback className="text-4xl font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                            {profile.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-500 transition-colors shadow-lg border-2 border-white dark:border-zinc-950">
                        <Camera className="w-4 h-4" />
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                        />
                    </label>
                </div>

                {/* Info Section */}
                <div className="flex-1 space-y-4">
                    <div>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-2">
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                {profile.business_name}
                            </h1>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Badge
                                            variant="outline"
                                            className={`capitalize px-3 py-1 text-sm cursor-help
                                            ${profile.role === 'wholesaler'
                                                    ? 'bg-purple-500/10 text-purple-600 border-purple-500/20'
                                                    : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                                                }`}
                                        >
                                            {profile.role}
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>This is your registered account type.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="flex flex-wrap text-zinc-500 items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-zinc-900 dark:text-white">
                                    {profile.name}
                                </span>
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border">
                                    Owner
                                </span>
                            </div>

                            {profile.business_type && (
                                <div className="flex items-center gap-1.5">
                                    <Building2 className="w-3.5 h-3.5" />
                                    {profile.business_type}
                                </div>
                            )}

                            {profile.location && (
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {profile.location}
                                </div>
                            )}

                            <div className="flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5" />
                                Est. {profile.years_in_business || '2023'}
                            </div>
                        </div>
                    </div>

                    {/* Trust Stats */}
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">

                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                            <div>
                                <div className="text-xs font-medium uppercase">Trust Score</div>
                                <div className="text-xl font-bold">{profile.trust_score}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <ShieldCheck className="w-4 h-4 text-blue-600" />
                            <div>
                                <div className="text-xs font-medium uppercase">Verification</div>
                                <div className="text-sm font-bold">
                                    {profile.gst_verified ? 'GST Verified' : 'Basic Level'}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
