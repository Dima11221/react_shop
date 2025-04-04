import style from './style.module.scss'
// import {Link} from "react-router-dom";

// interface IProps {
//     title: string;
// }

// const Header = ({title}: IProps) => {
const Header = () => {
    return (
        <header className={`${style.headFoot} ${style.flex}`}>
            <div className={`${style.container} ${style.headFootWrapper}`}>
                <h2 className={style.headLink}>
                    {/*<Link to='/'>{title}</Link>*/}
                    <a href="/">React Shop</a>
                </h2>
                <h3>
                    <a href="#">Огромный выбор товаров, скинов по любимой игре на ваш вкус!</a>
                </h3>
                <h3 className={style.headLink}>
                    {/*<Link to='/'>Главная страница</Link>*/}
                    <a href='/'>Главная страница</a>
                </h3>
            </div>
            <h3 className={`${style.headFootWrapper} ${style.headLink}`}>
                <a href='https://github.com/Dima11221/react_shop/tree/main' target='_blank'>Ссылка на репозиторий</a>
            </h3>
        </header>
    )

}

export {Header}