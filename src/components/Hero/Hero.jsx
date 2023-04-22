import './hero.scss';

export const Hero = ({children}) => {
    return (
        <div className="hero">
            <div className="wrapper">
                {children}
            </div>
        </div>
    )
}