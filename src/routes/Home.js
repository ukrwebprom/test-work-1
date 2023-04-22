import { Link } from "react-router-dom"
import { Hero } from "../components/Hero/Hero"
export const Home = () => {
    return (
        <Hero>
            <h1>TEST WORK <i>#1</i></h1>
            <h2>for a position of<br />Junior FrontEnd Developer</h2>
            <p><strong>Used technologies</strong></p>
            <p>React, SCSS, Material UI, CLSX, AXIOS</p>
            <Link to="tweets">Tweets</Link>
        </Hero>
        
    )
}