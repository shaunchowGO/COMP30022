import React from 'react';
import '../css/Filter.css'

function Filter(props) {
    const [activeItem, setActiveItem] = React.useState();
    const [activeSort, setActiveSort] = React.useState();
    const sortLabels = ["Ascending", "Descending"];

    const handleButtonClick = (buttonIndex) => {
        setActiveItem(buttonIndex);
    };

    const handleSortClick = (buttonIndex) => {
        setActiveSort(buttonIndex);
    };

    return (
        <div className="profile-filter">
          <div className="profile-filter-container">
            <div className="filter-section">
                <h4>Search Item</h4>
                <input type="text" id="search" placeholder="Search"/>
            </div>
            {props.hasScore &&
            <div>
            <h4>Similarity Range</h4>
                <div className="similarity-range filter-section">
                    <input type="number" id="search" placeholder="0%" min="0" max="100"/>
                    <p>-</p>
                    <input type="number" id="search" placeholder="100%" min="0" max="100"/>
                </div>    
            </div>
        }
            <h4>Sort Item</h4>
            <div className="sort-container filter-section">
                {props.buttonLabels.map((label, index) => (
                    <button
                    key={index}
                    className={`sort-btn ${index === activeItem ? "active" : ""}`}
                    onClick={() => handleButtonClick(index)}
                    >
                    {label}
                    </button>
                ))}
            </div>
            <div className="sort-order filter-section">
                <h4>Sort By: </h4>
                {sortLabels.map((label, index) => (
                    <button
                    key={index}
                    className={`sort-btn ${index === activeSort ? "active" : ""}`}
                    onClick={() => handleSortClick(index)}
                    >
                    {label}
                    </button>
                ))}
            </div>
            <div className="confirm-container filter-section">
                <button className="discard-btn blue-btn">Reset</button>
                <button className="blue-btn">Confirm</button>
            </div>
          </div>
        </div>
    )
}

export default Filter;