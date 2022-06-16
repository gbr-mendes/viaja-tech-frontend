import { SearchBar } from "./SearchBar";
import { ToggleBtn } from "./ToggleBtn";

import './MainHeader.css'

export function MainHeader() {
    return (
        <header className="main-header d-flex flex-column flex-md-row align-items-center p-2">
            <SearchBar />
            <ToggleBtn />
        </header>
    )
}