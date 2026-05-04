import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faT } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import styles from "../Styles/Deck.module.css";
import { useParams } from "react-router-dom";
import type Card from "../Interfaces/Card";
import { Stage, Layer, Text, Image } from 'react-konva';
import useImage from "use-image";

type Giphy = {
    id: string;
    title: string;
    url: string;
};

function Sticker({sticker, onDragEnd}: any) {
    const [image] = useImage(sticker.url);
    return (
        <Image
            image={image}
            x={sticker.x}
            y={sticker.y}
            width={sticker.width}
            height={sticker.height}
            draggable
            onDragEnd={onDragEnd}
        />
    );
}


function Edit() {
    // fetch related variables
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const [deckName, setDeckName] = useState();
    const { userId, deckId } = useParams();

    // side panel related variables
    const [textPanel, setTextPanel] = useState(false);
    const [gifPanel, setGifPanel] = useState(false);
    const [stickerPanel, setStickerPanel] = useState(false);
    const [text, setText] = useState("");
    const [textArea, setTextArea] = useState(false);
    const [textIndex, setTextIndex] = useState(0);

    // card related variables
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardSide, setCardSide] = useState("Front");
    const [cardNum, setCardNum] = useState(1);
    const [total, setTotal] = useState(1);
    const [frontCards, setFrontCards] = useState<Card[]>([{text: [], gif: [], sticker: []}]);
    const [backCards, setBackCards] = useState<Card[]>([{text: [], gif: [], sticker: []}]);

    // giphs and stickers related variables
    const [query, setQuery] = useState("");
    const [stickerResults, setStickerResults] = useState<Giphy[]>([]);

    const fetchGiphs = async (e: any) => {
        e.preventDefault();
        setQuery("");

        // implement fetch calls to gips api
    }

    const fetchStickers = async (e: any) =>  {
        e.preventDefault();
        setLoading(true);
        setQuery("");

        try {
            const response = await fetch(`https://api.giphy.com/v1/stickers/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${query.trim()}&limit=10&rating=g`);

            // get stickers related data
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Sorry, we could not get the stickers.");
            }

            // get the urls
            const stickers = data.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                url: item.images.original_still.url
            }));

            setStickerResults(stickers);
            setLoading(false);

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message || "Sorry, we could not get the stickers."});
        }
    }

    function createSticker(stickerUrl: string) {
        let stickerTmp = {url: stickerUrl, width: 100, height: 100, x: 20, y: 20};
        if (cardSide == "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, sticker: [...card.sticker, stickerTmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, sticker: [...card.sticker, stickerTmp]} : card
                )
            );
        }
    }

    console.log(frontCards);

    function createGiph(gifUrl: string) {
        let gifTmp = {url: gifUrl, width: 100, height: 100, x: 50, y: 50};
        if (cardSide == "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, gif: [...card.gif, gifTmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, gif: [...card.gif, gifTmp]} : card
                )
            );
        }
    }

    function changeTextColor(color: string) {
        if (cardSide === "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                        i === textIndex ? {...cardText, color: color} : cardText
                    )} : card
                )
            );
        } else if (cardSide == "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                        i === textIndex ? {...cardText, color: color} : cardText
                    )} : card
                )
            );
        }
    }

    function createSmallText() {
        let textTmp = {input: "Double click to edit text", width: 300, x: 30, y: 30, fontSize: 18, color: "#201002"};
        if (cardSide == "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, textTmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, textTmp]} : card
                )
            );
        }
    }

    function createMediumText() {
        let textTmp = {input: "Double click to edit text", width: 400, x: 30, y: 30, fontSize: 28, color: "#201002"};
        if (cardSide == "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, textTmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, textTmp]} : card
                )
            );
        }
    }

    function createLargeText() {
        let textTmp = {input: "Double click to edit text", width: 600, x: 30, y: 30, fontSize: 38, color: "#201002"};
        if (cardSide == "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, textTmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, textTmp]} : card
                )
            );
        }
    }

    function deleteText() {
        if (cardSide === "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.filter((_, index) =>
                        index != textIndex
                    )} : card
                )
            );
        } else if (cardSide == "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.filter((_, index) =>
                        index != textIndex
                    )} : card
                )
            );
        }
        setTextArea(false);
    }

    function showTextArea(request: boolean, textIndex: number, input: string) {
        setText(input);
        setTextIndex(textIndex);
        setTextArea(request);
    }

    function changeTextInput(e: any) {
        setText(e.target.value);
        if (cardSide === "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                        i === textIndex ? {...cardText, input: e.target.value} : cardText
                    )} : card
                )
            );
        } else if (cardSide == "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                        i === textIndex ? {...cardText, input: e.target.value} : cardText
                    )} : card
                )
            );
        }
    }

    function addCard() {
        if ((total + 1) <= 20) {
            setTotal(total + 1);
            setFrontCards([...frontCards, {text: [], gif: [], sticker: []}]);
            setBackCards([...backCards, {text: [], gif: [], sticker: []}]);
        }
    }

    function deleteCard() {
        if ((total - 1) >= 1) {
            setTotal(total - 1);
            setFrontCards(prev => prev.filter((_, index) => index != (cardNum - 1)));
            setBackCards(prev => prev.filter((_, index) => index != (cardNum - 1)));
            if (cardNum > 1) {
                setCardNum(cardNum - 1);
            } else {
                setCardNum(1);
            }
        }
    }

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle(styles.flip);
            setCardSide(prev => (prev === "Front") ? "Back" : "Front");
        }
    }

    function showNextCard() {
        if ((cardNum + 1) <= total) {
            showTextArea(false, 0, "");
            setCardNum(cardNum + 1);
            if (cardSide === "Back") {
                flipCard();
            }
        }
    }

    function showPrevCard() {
        if ((cardNum - 1) >= 1) {
            showTextArea(false, 0, "");
            setCardNum(cardNum - 1);
            if (cardSide === "Back") {
                flipCard();
            }
        }
    }

    function showTextPanel() {
        if (stickerPanel) {
            setStickerPanel(false);
        } else if (gifPanel) {
            setGifPanel(false);
        }
        setTextPanel(true);
    }

    function showGifPanel() {
        if (textPanel) {
            setTextArea(false);
            setTextPanel(false);
        } else if (stickerPanel) {
            setStickerPanel(false);
        }
        setGifPanel(true);
    }

    function showStickerPanel() {
        if (textPanel) {
            setTextArea(false);
            setTextPanel(false);
        } else if (gifPanel) {
            setGifPanel(false);
        }
        setStickerPanel(true);
    }

    function hideSidePanel() {
        if (textPanel) {
            setTextPanel(false);
            showTextArea(false, 0, "");
        } else if (stickerPanel) {
            setStickerPanel(false);
        } else if (gifPanel) {
            setGifPanel(false);
        }
    }
    
    const updateDeckContent  = async () => {
        setLoading(true);

        try {
            // update card content in mongodb
            const docResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/decks/${deckId}/saveCards`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "userId": userId,
                    "deckId": deckId,
                    "frontCards": frontCards,
                    "backCards": backCards
                })
            });

            // get message and card content
            const docData = await docResponse.json();

            if (!docResponse.ok) {
                throw new Error(docData.message);
            }

            setLoading(false);

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    }

    const fetchDeckData = async () => {
        setLoading(true);

        try {
            // get deck data from supabase
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/decks/${deckId}`);

            // get message and deck data
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // get card content from mongodb
            const docResponse = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/decks/${deckId}/cards`);

            // get message and card content
            const docData = await docResponse.json();

            if (!docResponse.ok) {
                throw new Error(docData.message);
            }

            // set deck name content to display
            setDeckName(data.name);
            setFrontCards(docData.frontCards);
            setBackCards(docData.backCards);
            setTotal(docData.frontCards.length);

            setLoading(false);

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    }
    
    useEffect(() => {
        fetchDeckData()
    }, []);

    return (
        <div className={styles.dashboardContent}>
            <Navbar userId={userId} />
            <div>
                <div className={styles.title}>{deckName || "Flashier Cards"}</div>
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
                <div className={styles.toolbar}>
                    <button
                        type="button"
                        className={styles.toolOption}
                        onClick={addCard}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                        onClick={showTextPanel}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faT} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                        onClick={showGifPanel}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front} style={{fontWeight: "600"}}>
                            GIF
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                        onClick={showStickerPanel}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                        onClick={deleteCard}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                        onClick={() => flipCard()}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faRightLeft} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption} 
                        onClick={() => updateDeckContent()}                       
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faFloppyDisk} />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.toolOption}
                        onClick={hideSidePanel}
                    >
                        <span className={styles.shadow}></span>
                        <span className={styles.edge}></span>
                        <span className={styles.front}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </span>
                    </button>
                </div>
                <div className={styles.panel}>
                    <div className={styles.deck}>
                        <div className={styles.card} ref={cardRef}>
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    <Stage
                                        width={800}
                                        height={400}
                                        onClick={(e) => {
                                            if (e.target === e.target.getStage()) {
                                                showTextArea(false, 0, "");
                                            }
                                        }}
                                    >
                                        <Layer>
                                            {frontCards[cardNum - 1].text.map((text, textIndex) =>
                                                <Text
                                                    key={textIndex}
                                                    x={text.x}
                                                    y={text.y}
                                                    width={text.width}
                                                    text={text.input}
                                                    fontFamily="Imprima"
                                                    fontSize={text.fontSize}
                                                    fill={text.color}
                                                    draggable
                                                    onDblClick={() => {
                                                        showTextPanel();
                                                        showTextArea(true, textIndex, text.input);
                                                    }}
                                                    onDragEnd={(e) => {
                                                        const { x, y } = e.target.position();
                                                        setFrontCards(prev =>
                                                            prev.map((card, cardIndex) =>
                                                                cardIndex === (cardNum - 1) ? {
                                                                    ...card,
                                                                    text: card.text.map((tmp, i) =>
                                                                        i === textIndex ? {...tmp, x: x, y: y} : tmp
                                                                    )
                                                                } : card
                                                            )
                                                        );
                                                    }}
                                                />
                                            )}
                                            {frontCards[cardNum - 1].sticker.map((sticker, stickerIndex) =>
                                                <Sticker
                                                    key={stickerIndex}
                                                    sticker={sticker}
                                                    onDragEnd={(e: any) => {
                                                        const { x, y } = e.target.position();
                                                        setFrontCards(prev =>
                                                            prev.map((card, cardIndex) =>
                                                                cardIndex === (cardNum - 1) ? {
                                                                    ...card,
                                                                    sticker: card.sticker.map((tmp, i) =>
                                                                        i === stickerIndex ? {...tmp, x: x, y: y} : tmp
                                                                    )
                                                                } : card
                                                            )
                                                        );
                                                    }}
                                                />
                                            )}
                                        </Layer>
                                        
                                    </Stage>                                    
                                </div>
                                <div className={styles.cardBack}>
                                    <Stage
                                        width={800}
                                        height={400}
                                        onClick={(e) => {
                                            if (e.target === e.target.getStage()) {
                                                showTextArea(false, 0, "");
                                            }
                                        }}
                                    >
                                        <Layer>
                                            {backCards[cardNum - 1].text.map((text, textIndex) =>
                                                <Text
                                                    key={textIndex}
                                                    x={text.x}
                                                    y={text.y}
                                                    width={text.width}
                                                    text={text.input}
                                                    fontFamily="Imprima"
                                                    fontSize={text.fontSize}
                                                    fill={text.color}
                                                    draggable
                                                    onDblClick={() => {
                                                        showTextPanel();
                                                        showTextArea(true, textIndex, text.input);
                                                    }}
                                                    onDragEnd={(e) => {
                                                        const { x, y } = e.target.position();
                                                        setBackCards(prev =>
                                                            prev.map((card, cardIndex) =>
                                                                cardIndex === (cardNum - 1) ? {
                                                                    ...card,
                                                                    text: card.text.map((tmp, i) =>
                                                                        i === textIndex ? {...tmp, x: x, y: y} : tmp
                                                                    )
                                                                } : card
                                                            )
                                                        );
                                                    }}
                                                />
                                            )}
                                            {backCards[cardNum - 1].sticker.map((sticker, stickerIndex) =>
                                                <Sticker
                                                    key={stickerIndex}
                                                    sticker={sticker}
                                                    onDragEnd={(e: any) => {
                                                        const { x, y } = e.target.position();
                                                        setBackCards(prev =>
                                                            prev.map((card, cardIndex) =>
                                                                cardIndex === (cardNum - 1) ? {
                                                                    ...card,
                                                                    sticker: card.sticker.map((tmp, i) =>
                                                                        i === stickerIndex ? {...tmp, x: x, y: y} : tmp
                                                                    )
                                                                } : card
                                                            )
                                                        );
                                                    }}
                                                />
                                            )}
                                        </Layer>
                                    </Stage>                            
                                </div>
                            </div>
                        </div>
                        <div className={styles.deckNav}>
                            <button disabled={cardNum === 1} onClick={showPrevCard}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <span>{cardSide} of Card {cardNum}/{total}</span>
                            <button disabled={cardNum === total} onClick={showNextCard}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.sidePanel} style={{display: textPanel ? "flex" : "none"}}>
                        <div style={{display: (textArea) ? "flex" : "none"}}>
                            <div className={styles.sidePanelTitle}>Text Input</div>
                            <div className={styles.textInput}>
                                <textarea placeholder="Enter text here" value={text} onChange={changeTextInput} />
                            </div>
                        </div>
                        <div style={{display: (textArea) ? "flex" : "none"}}>
                            <div className={styles.sidePanelTitle}>Text Deletion</div>
                            <div className={styles.textOptions}>
                                <button onClick={deleteText}>Delete</button>
                            </div>
                        </div>
                        <div style={{display: (textArea) ? "flex" : "none"}}>
                            <div className={styles.sidePanelTitle}>Text Color</div>
                            <div className={styles.textOptions}>
                                <div style={{backgroundColor: "#201002"}} onClick={() => changeTextColor("#201002")}></div>
                                <div style={{backgroundColor: "#FF2511"}} onClick={() => changeTextColor("#FF2511")}></div>
                                <div style={{backgroundColor: "#FED43F"}} onClick={() => changeTextColor("#FED43F")}></div>
                                <div style={{backgroundColor: "#016236"}} onClick={() => changeTextColor("#016236")}></div>
                                <div style={{backgroundColor: "#E43480"}} onClick={() => changeTextColor("#E43480")}></div>
                                <div style={{backgroundColor: "#621590"}} onClick={() => changeTextColor("#621590")}></div>
                                <div style={{backgroundColor: "#1F6CB0"}} onClick={() => changeTextColor("#1F6CB0")}></div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.sidePanelTitle}>Text Size</div>
                            <div className={styles.textOptions}>
                                <button onClick={createSmallText}>Small</button>
                                <button onClick={createMediumText}>Medium</button>
                                <button onClick={createLargeText}>Large</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sidePanel} style={{display: gifPanel ? "flex" : "none"}}>
                        <div>
                            <div className={styles.sidePanelTitle}>Gifs</div>
                            <form onSubmit={fetchGiphs}>
                                <input
                                    type="text"
                                    placeholder="Search for giphs"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button type="submit">Search</button>
                            </form>
                            {/* 2x4 grid to dispaly 8 giphs */}
                        </div>
                    </div>
                    <div className={styles.sidePanel} style={{display: stickerPanel ? "flex" : "none"}}>
                        <div>
                            <div className={styles.sidePanelTitle}>Stickers</div>
                            <form onSubmit={fetchStickers} className={styles.mediaForm}>
                                <input
                                    type="text"
                                    placeholder="Search for stickers"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button type="submit" className={styles.mediaFormBtn}>Search</button>
                            </form>
                            <div className={styles.mediaGrid}>
                                {stickerResults.map((sticker) => (
                                    <img
                                        key={sticker.id}
                                        src={sticker.url}
                                        alt={sticker.title}
                                        onClick={() => createSticker(sticker.url)}
                                    />
                                ))}
                            </div>
                            <div className={styles.giphyLogo}>Powered by Giphy</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;