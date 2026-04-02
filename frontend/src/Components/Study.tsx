import Navbar from "./Navbar";
import Deck from "./Deck";

function Study() {
    return (
        <div id="dashboard-content">
            <Navbar />
            <div>
                <div id="signup-title">Flashier Cards</div>
                <Deck />
            </div>
        </div>
    );
}

export default Study