import Navbar from "./Navbar"
import Deck from "./StudyDeck"

// study component of application
function Study() {
    return (
    <div className="main">
      <Navbar />
      <Deck />
    </div>
  );
}

export default Study;