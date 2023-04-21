import './hero.scss';

export const Hero = ({children}) => {
    return (
        <div className="hero">
            <div class="wrapper">
                {children}
            </div>
        </div>
    )
}