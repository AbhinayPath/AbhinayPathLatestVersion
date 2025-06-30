import React from 'react';
import Image from 'next/image';
import { getProfileCompletion, ProfileCompletionInput } from './profileCompletionUtils';

interface NavbarProfilePercentageProps {
  profileData: ProfileCompletionInput;
  user: any;
}

export const NavbarProfilePercentage: React.FC<NavbarProfilePercentageProps> = ({ profileData, user }) => {
  const percent = getProfileCompletion(profileData);
  const headshotUrl = profileData.headshots && profileData.headshots.length > 0 ? profileData.headshots[0] : null;
  return (
    <div className="flex items-center gap-2">
      {headshotUrl ? (
        <Image
          src={headshotUrl}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full object-cover border-2 border-gray-300"
        />
      ) : (
        <span className="rounded-full bg-[#7E1F2E] text-white w-10 h-10 flex items-center justify-center text-lg font-bold">
          {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
        </span>
      )}
      {/* <span className="text-xs font-semibold text-[#7E1F2E]">{percent}%</span> */}
    </div>
  );
};
