import { RestrauntCard } from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

function filterData(searchText, restaurants){
   const filterData = restaurants.filter((restaurant) => restaurant?.data?.name?.toLowerCase().includes(searchText.toLowerCase()));
   return filterData
}

const Body = () => {
    const [allRestuarants, setAllRestuarants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredRestuarants, setFilteredRestuarants] = useState([]);

    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants(){
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.8973944&lng=78.0880129&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        console.log(json);
        setAllRestuarants(json?.data?.cards[2]?.data?.data?.cards)
        setFilteredRestuarants(json?.data?.cards[2]?.data?.data?.cards)
    }

    //early return
    if(!allRestuarants) return null;


    return (
        
        allRestuarants.length == 0? <Shimmer/>:
            <>
            <div className="search-container">
            <input
            type = "text"
            className="search-input"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
                setSearchText(e.target.value);
            }}
            />
            <button className="search-btn" onClick={() => {
              const data = filterData(searchText, allRestuarants);
              setFilteredRestuarants(data);
            }}>Search</button>
        </div>
        <div className="resturant-list">
            {filteredRestuarants.length != 0?(
                filteredRestuarants.map((restaurant) => {
                    return (<Link to= {"/restuarant/" + restaurant.data.id} key = {restaurant.data.id}> <RestrauntCard {...restaurant.data} /></Link>)
                })
            ):"no restaurants match your search"}
        </div>
        </>
        
        
        
            
        
        
        
        
    )
}

export default Body;