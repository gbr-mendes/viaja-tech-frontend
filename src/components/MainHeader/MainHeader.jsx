import { ToggleBtn } from "./ToggleBtn";

import "./MainHeader.css";

export function MainHeader() {
  return (
    <header className="main-header d-flex flex-column align-items-center p-2 mt-3">
      <ToggleBtn />
    </header>
  );
}
