import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RestuarantMenu = () => {
    const params = useParams();
    const {id} = params;
    useEffect(() => {
        getRestuarantInfo();
    },[]);

    async function getRestuarantInfo(){
        const data = await fetch("https://www.swiggy.com/dapi/menu/v4/full?lat=27.8973944&lng=78.0880129&menuId=289579");
        const json = await data.json();
        console.log(json);
    }


    return (
        <div>
            <h1>Namaste</h1>
            <h2>id: {id}</h2>
            <h3>gzsd</h3>
        </div>
    )
}
export default RestuarantMenu;