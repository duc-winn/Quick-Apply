import QuickApplyGoogleMap from "../../Components/QuickApplyGoogleMap";
import { useState } from "react";
import SmallJobDisplay from "../../Components/SmallJobDisplay/SmallJobDisplay";

function SearchPage(){
    const [query, setQuery] = useState(""); // store what user types

    const handleSearch = () => {
        console.log("User searched for:", query);
        // You can now use `query` to call an API or filter results
    };

    return (
        <>
            <div className="flex">
                <div>
                    <div className="flex">
                        <div>
                            <input onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Enter jobs here..."className="text-black"/>
                        </div>
                        <div>
                            <button onClick={handleSearch}>search</button>
                        </div>
                    </div>
                    <div>
                        <SmallJobDisplay />
                    </div>
                </div>
                <div className="map-display">
                    <QuickApplyGoogleMap />
                </div>
            </div>
        </>
    );
}

export default SearchPage;