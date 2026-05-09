import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus, faFolderOpen, faPencil, faICursor, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaCircle, FaSquare, FaStar } from "react-icons/fa";
import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import type Deck from "../Interfaces/Deck";
import styles from "../Styles/Dashboard.module.css";
import UserAuth from "../AuthContext";
import { animate } from "animejs";
import Tooltip from "@mui/material/Tooltip";

function Dashboard() {
    const [toolVisible, setToolVisible] = useState(false);
    const [createOverlay, setCreateOverlay] = useState(false);
    const [renameOverlay, setRenameOverlay] = useState(false);
    const { userId } = useParams();
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const [decks, setDecks] = useState<Deck[]>([]);
    const [deckId, setDeckId] = useState<any>();
    const navigate = useNavigate();
    const { token } = UserAuth();

    const shapes = [
        ...Array(6).fill(FaCircle),
        ...Array(6).fill(FaSquare),
        ...Array(6).fill(FaStar)
    ];

    // added shapes style here because it was impacting other elements
    const shapesStyle = useMemo(() => {
        return shapes.map((_, index) => ({
            left: `${Math.random() * 95}%`,
            color: ["#004A94", "#FFD166", "#EF476F", "#06D6A0"][index % 4],
            fontSize: `${Math.random() * 25 + 25}px`
        }));
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        newName: ""
    });

    function handleStudyView() {
        navigate(`/user/${userId}/study/${deckId}`);
    }

    function handleEditView() {
        navigate(`/user/${userId}/edit/${deckId}`);
    }

    function handleToolbar(request: boolean, key: any) {
        setDeckId(key);
        setToolVisible(request);
    }

    function handleCreateOverlay(request: boolean) {
        if (request) {
            setError({status: false, message: ""});
        }
        if (!request) {
            setFormData({name: "", newName: ""});
            handleToolbar(false, 0);
        }
        setCreateOverlay(request);
    }
    
    function handleRenameOverlay(request: boolean) {
        if (request) {
            setError({status: false, message: ""});
        }
         if (!request) {
            setFormData({name: "", newName: ""});
            handleToolbar(false, 0);
        }
        setRenameOverlay(request);
    }

    function handleFormData(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    const fetchDeckData = async () => {
        setLoading(true);

        try {
            // get list of decks
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/decks`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // get message and deck data
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setDecks(data);
            setLoading(false);

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    }

    useEffect(() => {
        animate(`.${styles.floatingShapes}`, {
            translateY: ["100vh", "-120vh"],
            translateX: () => `${Math.random() * 120 - 60}px`,
            rotate: () => Math.random() * 360,
            opacity: [0, 0.45, 0],
            scale: () => Math.random() * 0.6 + 0.6,
            duration: () => Math.random() * 6000 + 9000,
            loopDelay: 0,
            loop: true,
            ease: "linear",
        });
        fetchDeckData()
    }, []);

    const submitCreateForm = async (e: any) => {
        e.preventDefault();
        handleCreateOverlay(false);
        setLoading(true);

        try {
            // create a deck in supabase
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/createDeck`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.name.trim()
                })
            });

            // get message and deck data
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // create a doc in mongodb
            const docResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/deck/${data.deckDto.id}/createCards`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "userId": userId,
                    "deckId": data.deckDto.id,
                    "frontCards": [{"text": [], "gif": [], "sticker": []}],
                    "backCards": [{"text": [], "gif": [], "sticker": []}]
                })
            });

            // get message and doc data
            const docData = await docResponse.json();

            if (!docResponse.ok) {
                throw new Error(docData.message);
            }

            setDecks(prev => [...prev, data.deckDto]);
            setLoading(false);

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    }

    const submitRenameForm = async (e: any) => {
        e.preventDefault();
        handleRenameOverlay(false);
        handleToolbar(false, 0);
        setLoading(true);

        try {
            // rename a deck
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/deck/${deckId}/renameDeck`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.newName.trim()
                })
            });

            // get message and deck data
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // update deck name
            setDecks(prev => 
                prev.map(deck => 
                    deck.id === data.deckDto.id ? data.deckDto : deck
                )
            );
            setLoading(false);

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    }

    const deleteDeck = async () => {
        handleToolbar(false, 0);
        setLoading(true);

        try {
            // delete a deck in supabase
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/deck/${deckId}/deleteDeck`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // get message and deck data
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // delete a doc in mongodb
            const docResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/deck/${deckId}/deleteCards`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // get message and doc data
            const docData = await docResponse.json();

            if (!response.ok) {
                throw new Error(docData.message);
            }

            // update deck list
            setDecks(prev => prev.filter(deck => deck.id !== deckId));
            setLoading(false);

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.floatingBackground}>
                {shapes.map((Icon, index) => (
                    <Icon
                        key={index}
                        className={styles.floatingShapes}
                        style={shapesStyle[index]}
                    />
                ))}
            </div>
            <div className={styles.dashboardContent} style={{pointerEvents: createOverlay || renameOverlay ? "none" : "auto"}}>
                <Navbar userId={userId} />
                <div>
                    <div>
                        <div className={styles.title}>Flashier Cards</div>
                        <div className={styles.toolbar}>
                            <Tooltip title="Create New Deck">
                                <button
                                    type="button"
                                    className={styles.toolOption}
                                    onClick={() => handleCreateOverlay(true)} 
                                >
                                    <span className={styles.shadow}></span>
                                    <span className={styles.edge}></span>
                                    <span className={styles.front}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </span>
                                </button>
                            </Tooltip>
                            <Tooltip title="Study Deck">
                                <button
                                    type="button"
                                    style={{ display: toolVisible ? "inline-block" : "none" }}
                                    className={styles.toolOption}
                                    onClick={handleStudyView}
                                >
                                    <span className={styles.shadow}></span>
                                    <span className={styles.edge}></span>
                                    <span className={styles.front}>
                                        <FontAwesomeIcon icon={faFolderOpen} />
                                    </span>
                                </button>
                            </Tooltip>
                            <Tooltip title="Edit Deck">
                                <button
                                    type="button"
                                    style={{ display: toolVisible ? "inline-block" : "none" }}
                                    className={styles.toolOption}
                                    onClick={handleEditView}
                                >
                                    <span className={styles.shadow}></span>
                                    <span className={styles.edge}></span>
                                    <span className={styles.front}>
                                        <FontAwesomeIcon icon={faPencil} />
                                    </span>
                                </button>
                            </Tooltip>
                            <Tooltip title="Rename Deck">
                                <button
                                    type="button"
                                    style={{ display: toolVisible ? "inline-block" : "none" }}
                                    className={styles.toolOption}
                                    onClick={() => handleRenameOverlay(true)}
                                >
                                    <span className={styles.shadow}></span>
                                    <span className={styles.edge}></span>
                                    <span className={styles.front}>
                                        <FontAwesomeIcon icon={faICursor} />
                                    </span>
                                </button>
                            </Tooltip>
                            <Tooltip title="Delete Deck">
                                <button
                                    type="button"
                                    style={{ display: toolVisible ? "inline-block" : "none" }}
                                    className={styles.toolOption}
                                    onClick={deleteDeck}
                                >
                                    <span className={styles.shadow}></span>
                                    <span className={styles.edge}></span>
                                    <span className={styles.front}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                </button>
                            </Tooltip>
                            <Tooltip title="Cancel Selection">
                                <button
                                    type="button"
                                    onClick={() => handleToolbar(false, 0)}
                                    style={{ display: toolVisible ? "inline-block" : "none" }}
                                    className={styles.toolOption}
                                >
                                    <span className={styles.shadow}></span>
                                    <span className={styles.edge}></span>
                                    <span className={styles.front}>
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </span>
                                </button>
                            </Tooltip>
                        </div>
                        { (loading) ?
                            <div className={styles.invalidRequest}>
                                Loading request...
                            </div>
                        :
                            (error.status) ?
                                <div className={styles.invalidRequest}>{error.message}</div>
                            :
                                <div></div>
                        }
                        <div className={styles.deckList}>
                            {
                                decks.map(deck => 
                                    <div 
                                        key={deck.id.toString()}
                                        className={styles.deck}
                                        onClick={() => handleToolbar(true, deck.id)}
                                        style={{border: (deck.id == deckId) ? "2px solid #004A94" : ""}}
                                    >
                                        {deck.name}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div style={{display: createOverlay ? "flex" : "none"}}  className={styles.overlay}>
                        <div className={styles.exitOverlay}>
                            <FontAwesomeIcon 
                                icon={faCircleXmark} 
                                onClick={() => handleCreateOverlay(false)}
                                style={{cursor: "pointer"}}
                            />
                        </div>
                        <form className={styles.signupForm} onSubmit={submitCreateForm}>
                            <div className={styles.formHeading}>Create a New Deck</div>
                            <div className={styles.formField}>
                                <div className={styles.subtitle}>Name</div>
                                <input 
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormData}
                                    required={true}
                                />
                            </div>
                            <button
                                type="submit"
                                className={styles.homeBtn}
                                style={{marginTop: "0.5rem"}}
                            >
                                <span className={styles.loginShadow}></span>
                                <span className={styles.loginEdge}></span>
                                <span className={styles.loginFront}>Create</span>
                            </button>
                        </form>
                    </div>
                    <div style={{display: renameOverlay ? "flex" : "none"}}  className={styles.overlay}>
                        <div className={styles.exitOverlay}>
                            <FontAwesomeIcon 
                                icon={faCircleXmark} 
                                onClick={() => handleRenameOverlay(false)}
                                style={{cursor: "pointer"}}
                            />
                        </div>
                        <form className={styles.signupForm} onSubmit={submitRenameForm}>
                            <div className={styles.formHeading}>Rename the Deck</div>
                            <div className={styles.formField}>
                                <div className={styles.subtitle}>New name</div>
                                <input 
                                    type="text"
                                    name="newName"
                                    value={formData.newName}
                                    onChange={handleFormData}
                                    required={true}
                                />
                            </div>
                            <button
                                type="submit"
                                className={styles.homeBtn}
                                style={{marginTop: "0.5rem"}}
                            >
                                <span className={styles.loginShadow}></span>
                                <span className={styles.loginEdge}></span>
                                <span className={styles.loginFront}>Rename</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;