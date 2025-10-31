import QuickApplyGoogleMap from "../../Components/QuickApplyGoogleMap/QuickApplyGoogleMap";
import { useState } from "react";
import SmallJobDisplay from "../../Components/SmallJobDisplay/SmallJobDisplay";
import './SearchPage.css';

function SearchPage(){
    const [query, setQuery] = useState(""); // store what user types

    const handleSearch = () => {
        console.log("User searched for:", query);
        // You can now use `query` to call an API or filter results
    };

    return (
        <div className="search-page">
            <div className="search-page-layout">
                {/* Left Side - Search and Job Listings */}
                <div className="search-jobs-section">
                    {/* Search Bar */}
                    <div className="search-container">
                        <div className="search-input-wrapper">
                            <input 
                                onChange={(e) => setQuery(e.target.value)} 
                                value={query} 
                                placeholder="Search for jobs..."
                                className="search-input"
                            />
                        </div>
                        <div>
                            <button onClick={handleSearch} className="search-button">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Job Listings */}
                    <div className="job-listings-container">
                        <SmallJobDisplay title={query}/>
                         <SmallJobDisplay title={query}/>
                          <SmallJobDisplay title={query}/>
                           <SmallJobDisplay title={query}/>
                            <SmallJobDisplay title={query}/>
                    </div>
                </div>

                {/* Right Side - Map */}
                <div className="map-section">
                    <QuickApplyGoogleMap />
                </div>
            </div>
        </div>
    );
}

export default SearchPage;