"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    const res = await fetch("http://localhost:8080/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      router.push("/auth/login");
      return;
    }

    const data = await res.json();
    setProfile(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10">
      <ProfileHeader profile={profile} onUpdate={fetchProfile} />
      <ProfileTabs profile={profile} onUpdate={fetchProfile} />
    </div>
  );
}
