"use client";

import FormProfile from "@/components/FormProfile";
import ProfileSidebar from "@/components/ProfileSidebar";

export default function PengaturanAkun() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <ProfileSidebar />
        <FormProfile />
      </div>
    </div>
  );
}
