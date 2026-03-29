import { useState } from 'react';
import "./Dashboard.css";

const Dashboard = () => {

    const [deckClicked, setdeckClicked] = useState<string | null>(null);

    return (
        <div className='main'>
        <h1 className="title">Flashier Cards</h1>
            <nav className='toolbar'>
                {( !deckClicked &&
                    <>
                        <button>Create</button>
                    </>
                )}
                {( deckClicked &&
                    <>
                        <button>Study</button>
                        <button>Edit</button>
                        <button>Rename</button>
                        <button>Delete</button>
                        <button onClick={() => setdeckClicked(null)}>Cancel</button>
                    </>
                )}
            </nav>
            <form className='decks-list'>
                <input type="radio" id="deck1" name="deck" checked={deckClicked=== "deck1"} onChange={() => setdeckClicked("deck1")}/>
                    <label htmlFor='deck1'>SENG 645 Exam 1</label>
                <input type="radio" id="deck2" name="deck" checked={deckClicked === "deck2"} onChange={() => setdeckClicked("deck2")}/>
                    <label htmlFor='deck2'>SENG 645 Exam 1</label>
                <input type="radio" id="deck3" name="deck" checked={deckClicked=== "deck3"}
                onChange={() => setdeckClicked("deck3")}/>
                    <label htmlFor='deck3'>SENG 645 Exam 1</label>
            </form>
        </div>
    );

};
export default Dashboard;