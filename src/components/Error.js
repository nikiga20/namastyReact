import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    return (
        <>
        <div>Oops!!!!!!!!</div>
        <h2>{err.status +" "+err.statusText}</h2>
        </>
        
    )
}

export default Error;