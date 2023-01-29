import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../config";
import Shimmer from "./Shimmer";


const RestuarantMenu = () => {
    const {id} = useParams();
    const [restuarent, setRestuarent] = useState(null);
    console.log({id});

    useEffect(() => {
        getRestuarantInfo();
    },[]);

    async function getRestuarantInfo(){
        const data = await fetch("https://www.swiggy.com/dapi/menu/v4/full?lat=27.8973944&lng=78.0880129&menuId=" + id );
        const json = await data.json();
        console.log(json);
        setRestuarent(json.data);
    }

    if (!restuarent){
        return <Shimmer/>
    }

    return (
        <div className="menu">
            <div>
            <h1>Restuarent id : {id}</h1>
            <h2>{restuarent.name}</h2>
            <img src = {IMG_CDN_URL + restuarent.cloudinaryImageId}/>
            <h3>{restuarent.area}</h3>
            <h3>{restuarent.city}</h3>
            <h3>{restuarent.avgRating} stars</h3>
            <h3>{restuarent.costForTwo}</h3>
            </div>
            <div>
                <h1>Menu</h1>
                <ul>
                    {
                        Object?.values(restuarent?.menu?.items).map((item)=> (
                            <li key={item.id}>{item.name}</li>
                        ))
                    }
                </ul>
            </div>
        </div> 
    )
}

export default RestuarantMenu;