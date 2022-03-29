import { useMatch } from "react-router";
import { Link } from "react-router-dom";
import JSON from "./json/items.json";

function Nav() {
    const onHome = useMatch("/") !== null;
    const onSCPItems = useMatch("/scp-items/:item") !== null;
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={"nav-link" + (onHome ? " active" : "")} aria-current={onHome ? "page" : "false"} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={"nav-link" + (onSCPItems ? " active" : "")} aria-current={onSCPItems ? "page" : "false"} to={"/scp-items/" + JSON[0].scpNumber}>SCP Items</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;