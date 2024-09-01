import quickApplyImage from '../assets/quick-apply-home-image.png';
import { Link } from 'react-router-dom';
import {useState , useEffect } from 'react';
function WelcomePage(){

    const [isVisible, setIsVisible] = useState(false);
      
    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="flex mt-5 justify-center">
            <div className={`transition delay-400 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} justify-center content-center`}>
                <div className="grow">
                <div className="text-center">
            <h1 className="text-7xl font-bold tracking-tight text-white-900 sm:text-6xl">
              Welcome To
            </h1>
            <h1 className="text-7xl font-bold tracking-tight text-white-900 sm:text-6xl">
              Quick Apply!
            </h1>
            <p className="mt-6 text-lg leading-8 text-whote-600">
              Reduce the time of job searching by HALF by leaving the tedious tasks to us!
            </p>
            <div className={`transition delay-1000 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} mt-10 flex items-center justify-center gap-x-6`}>
              <Link
                to="/search"
                className="get-started-button rounded-md px-10 py-4 text-3xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
            </div>
          </div>
                </div>
            </div>
            <div className={`transition delay-500 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <img src={quickApplyImage} className="w-3/4 h-auto mx-auto"></img>
            </div>
        </div>
    );
}

export default WelcomePage;