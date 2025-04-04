import style from './style.module.scss'
// import {Link} from "react-router-dom";

// interface IProps {
//     title: string;
// }

// const Header = ({title}: IProps) => {
const Header = () => {
    return (
        <header className={style.headFoot}>
            <div className={`${style.container} ${style.headFootWrapper}`}>
                <h2 className={style.headLink}>
                    {/*<Link to='/'>{title}</Link>*/}
                    <p>React Shop</p>
                </h2>
                <h3>
                    <a href="#">Огромный выбор товаров, скинов по любимой игре на ваш вкус!</a>
                </h3>
                <h3 className={style.headLink}>
                    {/*<Link to='/'>Главная страница</Link>*/}
                    <p>Главная страница</p>
                </h3>
            </div>
        </header>
    )

}

export {Header}