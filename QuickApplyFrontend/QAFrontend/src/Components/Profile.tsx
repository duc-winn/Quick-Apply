import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/outline';
  
  // Functional component with typed props
  function Profile(){
    const [isLoggedIn, setIsLoggedIn] = useState<String | null>(null);
    const [abbreviateUsername, setAbbreviateUsername] = useState<String | null>(null);
    const [userName, setUserName] = useState<String | null>(null);

    useEffect(() => {
        let isLoggedIn = localStorage.getItem('isLoggedIn');

        if(isLoggedIn === 'true'){
            setIsLoggedIn('true');
            let userName = localStorage.getItem('username');
           
            if(userName){
                setUserName(userName);
                setAbbreviateUsername(userName.substring(0, 2).toUpperCase());
            }
        }
    }, []);

    function handleLogOut(){
        localStorage.clear();
        // Refresh the page
        window.location.reload();
    }

     return (
    <>
     <div className="flex items-center">
     <div>
         <div className="flex-shrink-0">
             <Menu as="div" className="relative ml-3">
                 <div>
                     <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                         <span className="sr-only">Open user menu</span>
                         <div className={`flex border-2 border-white items-center justify-center w-12 h-12 rounded-full bg-user-icon text-white text-xl`}>
                            {isLoggedIn === null ?  <UserIcon className="h-6 w-6 text-white" />  : <> {abbreviateUsername} </>}
                        </div>
                     </MenuButton>
                 </div>
                 <MenuItems className="absolute pb-2 right-0 z-10 mt-2 w-48 origin-top-right bg-black rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                        {isLoggedIn === null ? (<MenuItem>
                         <Link
                             to="/signin"
                             className={`block px-4 py-2 w-full text-center rounded-md text-sm text-white bg-green-600`}
                         >
                             Sign In
                         </Link>
                     </MenuItem>) : (
                        <>
                                <MenuItem>
                                <div className='font-bold block px-4 py-2 text-sm text-white-700 bg-black'>
                                    Username: {userName}
                                </div>
                                </MenuItem>
                            <MenuItem>
                                     <button
                                        onClick={handleLogOut}
                                        className={`block px-4 py-2 w-full rounded-md text-sm text-white bg-red-600`}
                                    >
                                        Sign out
                                    </button>
                               
                            </MenuItem>
                        </>
                         )}
                        
                 </MenuItems>
             </Menu>
         </div>
     </div>
</div>
        </>
     );
}

export default Profile;