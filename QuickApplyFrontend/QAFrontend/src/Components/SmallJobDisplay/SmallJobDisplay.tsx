import { useState } from "react";
import { Bookmark } from "lucide-react";
import './SmallJobDisplay.css'

function SmallJobDisplay() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  let isRemote = true;

  return (
    <div
      className="job-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left side - Logo (1/3) */}
      <div  className = "left-side-div">
        <img className="left-side-logo-img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoiRex6jj6ikQceZCw2f9_uX5UCmcjUafRMEPP&s=0"
          alt={`Phoenix Recruitment logo`}
        />
      </div>

      {/* Right side - Content (2/3) */}
      <div className="right-side-div">
        {/* Row 1: Title and Save Button */}
        <div className="right-side-top-div">
          <h3 className="job-title">
            Dick Sucker
          </h3>
          <button className={`save-button ${isSaved ? 'saved' : ''}`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setIsSaved((prev) => !prev); // Toggle true/false
            }}
            title={isSaved ? 'Unsave job' : 'Save job'}
          >
            <Bookmark size={20} fill={isSaved ? '#4a9eff' : 'none'} />
          </button>
        </div>

        {/* Row 2: Company, Location, Salary, Remote */}
        <div  className = "right-side-middle-div">
          <span className = "company-name" >Phoenix Recruitment</span>
          <span>•</span>
          <span>Whereever Danny mom lives</span>
          <span>•</span>
          <span>$85K-$95K</span>
          {isRemote && (
            <>
              <span>•</span>
              <span style={{ color: '#4ade80', fontWeight: '500' }}>Remote</span>
            </>
          )}
        </div>

        {/* Row 3: Posted Time */}
        <div className = "right-side-bottom-div">
          1 day ago
        </div>
      </div>
    </div>
  );
}

export default SmallJobDisplay