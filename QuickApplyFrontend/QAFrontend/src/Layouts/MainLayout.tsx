import {Outlet} from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Profile from '../Components/Profile';
import { useEffect, useState} from 'react';

function MainLayout(){

    return (
        <>
            <div className="flex justify-around">
                <div className="w-5/6">
                     <NavBar />
                </div>
                <div className="w-1/6 justify-end content-center">
                    <Profile />
                </div>
                
            </div>
            <div>
                <Outlet />
            </div>
            
        </>
    );
}

export default MainLayout