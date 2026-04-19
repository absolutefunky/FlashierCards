import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faICursor } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import { useUser } from "../context/UserContext";
import { getDecks, createDeck, renameDeck, deleteDeck } from "../api/client";
import type { Deck } from "../api/types";

function Dashboard() {
    const { userId } = useUser();
    const navigate = useNavigate();
    const [decks, setDecks] = useState<Deck[]>([]);
    const [checkedDeck, setCheckedDeck] = useState<Deck | null>(null);
    const [toolOptionHidden, setToolOptionHidden] = useState(true);
    const [createOverlay, setCreateOverlay] = useState(false);
    const [renameOverlay, setRenameOverlay] = useState(false);
    const [deckName, setDeckName] = useState("");

    useEffect(() => {
        if (!userId) return;
        getDecks(userId).then(setDecks);
    }, [userId]);

    async function handleCreate() {
        if (!userId || !deckName.trim()) return;
        const created = await createDeck(userId, deckName.trim());
        setDecks(prev => [...prev, created]);
        setDeckName("");
        setCreateOverlay(false);
    }

    async function handleRename() {
        if (!userId || !checkedDeck || !deckName.trim()) return;
        const updated = await renameDeck(userId, checkedDeck.id, deckName.trim());
        setDecks(prev => prev.map(d => d.id === updated.id ? updated : d));
        setDeckName("");
        setRenameOverlay(false);
    }

    async function handleDelete() {
        if (!userId || !checkedDeck) return;
        await deleteDeck(userId, checkedDeck.id);
        setDecks(prev => prev.filter(d => d.id !== checkedDeck.id));
        setCheckedDeck(null);
        setToolOptionHidden(true);
    }

    return (
        <div id="dashboard-content">
            <Navbar />
            <div>
                <div id="signup-title">Flashier Cards</div>

                <div id="toolbar">
                    <button
                        type="button"
                        onClick={() => { setCheckedDeck(null); setToolOptionHidden(true); }}
                        style={{ display: toolOptionHidden ? "none" : "inline-block" }}
                        className="tool-option"
                    >
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front"><FontAwesomeIcon icon={faCircleXmark} /></span>
                    </button>

                    <button className="tool-option" onClick={() => setCreateOverlay(true)}>
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front"><FontAwesomeIcon icon={faPlus} /></span>
                    </button>

                    <button
                        style={{ display: toolOptionHidden ? "none" : "inline-block" }}
                        className="tool-option"
                        onClick={() => checkedDeck && navigate("/study", { state: { deck: checkedDeck } })}
                    >
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front"><FontAwesomeIcon icon={faFolderOpen} /></span>
                    </button>

                    <button
                        style={{ display: toolOptionHidden ? "none" : "inline-block" }}
                        className="tool-option"
                        onClick={() => checkedDeck && navigate("/edit", { state: { deck: checkedDeck } })}
                    >
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front"><FontAwesomeIcon icon={faPencil} /></span>
                    </button>

                    <button
                        style={{ display: toolOptionHidden ? "none" : "inline-block" }}
                        className="tool-option"
                        onClick={() => { setDeckName(checkedDeck?.name ?? ""); setRenameOverlay(true); }}
                    >
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front"><FontAwesomeIcon icon={faICursor} /></span>
                    </button>

                    <button
                        type="button"
                        style={{ display: toolOptionHidden ? "none" : "inline-block" }}
                        className="tool-option"
                        onClick={handleDelete}
                    >
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front"><FontAwesomeIcon icon={faTrash} /></span>
                    </button>
                </div>

                <form className="decks-list">
                    {decks.map(deck => (
                        <label key={deck.id} onClick={() => { setCheckedDeck(deck); setToolOptionHidden(false); }}>
                            <input
                                type="radio"
                                name="deck"
                                checked={checkedDeck?.id === deck.id}
                                onChange={() => {}}
                            />
                            {deck.name}
                        </label>
                    ))}
                    {decks.length === 0 && <p>No decks yet. Create one with the + button.</p>}
                </form>
            </div>

            {createOverlay && (
                <div className="overlay">
                    <div className="cancel-action">
                        <FontAwesomeIcon icon={faCircleXmark} onClick={() => setCreateOverlay(false)} />
                    </div>
                    <div className="signup-subtitle">Create a New Deck</div>
                    <input type="text" value={deckName} onChange={e => setDeckName(e.target.value)} />
                    <button className="input-button" onClick={handleCreate}>
                        <span className="shadow-input"></span>
                        <span className="edge-input"></span>
                        <span className="front-input">CREATE</span>
                    </button>
                </div>
            )}

            {renameOverlay && (
                <div className="overlay">
                    <div className="cancel-action">
                        <FontAwesomeIcon icon={faCircleXmark} onClick={() => setRenameOverlay(false)} />
                    </div>
                    <div className="signup-subtitle">Rename the Deck</div>
                    <input type="text" value={deckName} onChange={e => setDeckName(e.target.value)} />
                    <button className="input-button" onClick={handleRename}>
                        <span className="shadow-input"></span>
                        <span className="edge-input"></span>
                        <span className="front-input">ENTER</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
