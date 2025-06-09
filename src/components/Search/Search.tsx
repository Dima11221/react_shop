import {useState} from "react";
import style from "./style.module.scss"

interface ISeacrhProps {
    handleSearch: (str: string) => void;
}

const Search = ({handleSearch}: ISeacrhProps) => {
    const [value, setValue] = useState<string>('')
    const HandleKey = (e: { key: string; }) => {
        if (e.key === "Enter") {
            HandleSubmit();
        }
    }

    const HandleSubmit = () => {
        handleSearch(value);
    }

    return (
        <div className={style.row}>
            <div className={style.inputField}>
                <input
                    className={style.inputStyle}
                    type='search'
                    placeholder='Search...'
                    id='search-input'
                    onKeyDown={HandleKey}
                    onChange={e => setValue(e.target.value)}
                    value={value}
                />
                <button
                    className={`${style.btn} ${style.searchBtn} ${style.btnReset}`}
                    onClick={HandleSubmit}
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export { Search }
