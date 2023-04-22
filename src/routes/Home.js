import { Link } from "react-router-dom"
import { Hero } from "../components/Hero/Hero"
export const Home = () => {
    return (
        <Hero>
            <h1>TEST WORK <i>#1</i></h1>
            <Link to="/tweets">Tweets</Link>
        </Hero>
        
    )
}