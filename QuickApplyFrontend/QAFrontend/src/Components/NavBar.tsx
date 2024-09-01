import { Link } from 'react-router-dom';

import { HomeIcon, MagnifyingGlassIcon, BookmarkIcon, BriefcaseIcon, UserGroupIcon } from '@heroicons/react/24/outline';

function NavBar() {
  return (
    <header className="bg-transparent">
      <nav aria-label="Global" className="mx-auto flex w-4/5 max-w-7xl items-center justify-around p-6 lg:px-8">
        {/* Navigation Links (Centered) */}
        <div className="flex-1 flex justify-between content-center lg:gap-x-20">
            <div className="group relative flex flex-col items-center">
                    <Link to="/" className="relative z-10 flex items-center justify-center">
                    <HomeIcon className="h-8 w-8 transition-opacity duration-300 group-hover:opacity-0" />
                    </Link>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold leading-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Home
                    </span>
            </div>

            <div className="group relative flex flex-col items-center">
                <Link to="/search" className="relative z-10 flex items-center justify-center">
                <MagnifyingGlassIcon className="h-8 w-8 transition-opacity duration-300 group-hover:opacity-0" />
                </Link>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold leading-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Search
                </span>
            </div>

            <div className="group relative flex flex-col items-center">
                <Link to="/saved-jobs" className="relative z-10 flex items-center justify-center">
                <BookmarkIcon className="h-8 w-8 transition-opacity duration-300 group-hover:opacity-0" />
                </Link>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold leading-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Saved Jobs
                </span>
            </div>
            
            <div className="group relative flex flex-col items-center">
                <Link to="/applied-jobs" className="relative z-10 flex items-center justify-center">
                <BriefcaseIcon className="h-8 w-8 transition-opacity duration-300 group-hover:opacity-0" />
                </Link>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold leading-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Applied Jobs
                </span>
            </div>

            <div className="group relative flex flex-col items-center">
                <Link to="/employee-referals" className="relative z-10 flex items-center justify-center">
                <UserGroupIcon className="h-8 w-8 transition-opacity duration-300 group-hover:opacity-0" />
                </Link>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold leading-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Employee Referals
                </span>
            </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;