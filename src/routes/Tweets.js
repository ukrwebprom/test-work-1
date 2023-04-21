import { Link, useLocation } from "react-router-dom"
import { UserGallery } from "../components/UserGallery/UserGallery";

export const Tweets = () => {
    const location = useLocation();
    return (
        <>
        <p>Tweets</p>
        <Link to={location.state?.from ?? '/'}>Back</Link>
        <UserGallery />
        </>

        
    )
}