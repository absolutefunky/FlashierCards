import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faICursor } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import styles from "../Styles/Dashboard.module.css";

function Dashboard() {
    const [toolVisible, setToolVisible] = useState(false);
    const [createOverlay, setCreateOverlay] = useState(false);
    const [renameOverlay, setRenameOverlay] = useState(false);

    function handleToolbar(request: boolean) {
        setToolVisible(request);
    }

    function handleCreateOverlay(request: boolean){
        setCreateOverlay(request);
    }
    
    function handleRenameOverlay(request: boolean){
        setRenameOverlay(request);
    }

    return (
        <div id={styles.dashboardContent}>
            <Navbar />
            <div>
                <div>
                    <div id={styles.title}>Flashier Cards</div>
                    <div id={styles.toolbar}>
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
                        <Link
                            style={{ display: toolVisible ? "inline-block" : "none" }}
                            className={styles.toolOption}
                            to="/study"
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faFolderOpen} />
                            </span>
                        </Link>
                        <Link
                            style={{ display: toolVisible ? "inline-block" : "none" }}
                            className={styles.toolOption}
                            to="/edit"
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faPencil} />
                            </span>
                        </Link>
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
                        <button
                            type="button"
                            style={{ display: toolVisible ? "inline-block" : "none" }}
                            className={styles.toolOption}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleToolbar(false)}
                            style={{ display: toolVisible ? "inline-block" : "none" }}
                            className={styles.toolOption}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </span>
                        </button>
                    </div>
                    <div className={styles.deckList}>
                        <div className={styles.deck} onClick={() => handleToolbar(true)}>
                            SENG 645 Exam 1 Review
                        </div>
                        <div className={styles.deck} onClick={() => handleToolbar(true)}>
                            SENG 645 Exam 2 Review
                        </div>
                        <div className={styles.deck} onClick={() => handleToolbar(true)}>
                            SENG 645 Exam 3 Review
                        </div>
                        <div className={styles.deck} onClick={() => handleToolbar(true)}>
                            SENG 645 Exam 4 Review
                        </div>
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
                    <form className={styles.signupForm}>
                        <div className={styles.formHeading}>Create a New Deck</div>
                        <div className={styles.formField}>
                            <div className={styles.subtitle}>Name</div>
                            <input type="text" />
                        </div>
                        <button
                            type="button"
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
                    <form className={styles.signupForm}>
                        <div className={styles.formHeading}>Rename the Deck</div>
                        <div className={styles.formField}>
                            <div className={styles.subtitle}>New name</div>
                            <input type="text" />
                        </div>
                        <button
                            type="button"
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
    );
}

export default Dashboard;
