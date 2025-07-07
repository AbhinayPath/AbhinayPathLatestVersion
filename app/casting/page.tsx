// Dashboard page for casting directors
import React from 'react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, Film } from 'lucide-react';

const CastingDashboardPage = () => {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#f9f5f7] to-[#f0e6ea] px-2">
      <div className="w-full max-w-3xl">
        <div className="rounded-2xl shadow-xl bg-white/90 border border-gray-200 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-extrabold flex items-center gap-3 text-[#7E1F2E] mb-2">
                <Film className="w-8 h-8 text-[#7E1F2E]" />
                Casting Dashboard
              </h1>
              <p className="text-gray-600 text-base max-w-md">
                Welcome, Director! Manage your auditions, view applicants, and track your casting progress here.
              </p>
            </div>
            <Link href="/casting/create-audition">
              <Button className="rounded-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white px-7 py-3 flex items-center gap-2 text-base shadow-lg">
                <PlusCircle className="w-5 h-5" />
                Create Audition
              </Button>
            </Link>
          </div>

          {/* Empty State / Audition List */}
          <section className="mt-8">
            {/* TODO: Replace with real audition listing */}
            <div className="flex flex-col items-center justify-center py-12 px-4 rounded-xl bg-gradient-to-tr from-[#f8e6ec] to-[#fff] border border-dashed border-[#e5c7d1]">
              <Users className="w-12 h-12 text-[#d19ca7] mb-4" />
              <p className="text-xl font-semibold mb-2 text-[#7E1F2E]">No auditions yet</p>
              <p className="text-gray-500 mb-6 text-center max-w-xs">Start by creating your first audition. Once you do, you’ll see them listed here with applicant stats and quick actions.</p>
              <Link href="/casting/create-audition">
                <Button variant="outline" className="rounded-full border-[#7E1F2E] text-[#7E1F2E] hover:bg-[#f8e6ec]">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Audition
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CastingDashboardPage;
