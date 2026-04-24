import Navbar from "./Navbar";
import DeckViewer from "./Deck";

function Study() {
    return (
        <div id="dashboard-content">
            <Navbar />
            <div>
                <div id="signup-title">Flashier Cards</div>
                <DeckViewer />
            </div>
        </div>
    );
}

export default Study;
