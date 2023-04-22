import './hero.scss';

export const Hero = ({children}) => {
    return (
        <div className="hero">
                {children}
        </div>
    )
}