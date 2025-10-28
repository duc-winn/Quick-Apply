import QuickApplyGoogleMap from "../Components/QuickApplyGoogleMap";

function SearchPage(){
    return (
        <>
            <div className="flex">
                <div>
                    <div className="flex">
                        <div>
                            <input placeholder="Enter jobs here..."className="text-black"/>
                        </div>
                        <div>
                            <button>search</button>
                        </div>
                    </div>
                    <div>
                        Job listings goes here
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