import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faT, faHeart, faTrash, faFloppyDisk, faCircleXmark, faChevronLeft, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { useEffect, useRef, useState } from "react";
import styles from "../Styles/Deck.module.css";
import { useParams } from "react-router-dom";
import type Card from "../Interfaces/Card";
import { Stage, Layer, Text, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

type GiphySticker = {
  id: string;
  title: string;
  url: string;
};

type Stickers = {
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

function StickerImage({
  sticker,
  index,
  onDragEnd,
}: {
  sticker: Stickers;
  index: number;
  onDragEnd: (index: number, x: number, y: number) => void;
}) {
  const [image] = useImage(sticker.url, "anonymous");

  return (
    <KonvaImage
      image={image}
      x={sticker.x}
      y={sticker.y}
      width={sticker.width}
      height={sticker.height}
      draggable
      onDragEnd={(e) => onDragEnd(index, e.target.x(), e.target.y())}
    />
  );
}

function Edit() {
  const [error, setError] = useState({ status: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [deckName, setDeckName] = useState("");
  const { userId, deckId } = useParams();

  const [textPanel, setTextPanel] = useState(false);
  const [gifPanel, setGifPanel] = useState(false);
  const [stickerPanel, setStickerPanel] = useState(false);

  const [text, setText] = useState("");
  const [textArea, setTextArea] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const [stickerSearch, setStickerSearch] = useState("");
  const [stickerResults, setStickerResults] = useState<GiphySticker[]>([]);

  const cardRef = useRef<HTMLDivElement>(null);
  const [cardSide, setCardSide] = useState("Front");
  const [cardNum, setCardNum] = useState(1);
  const [total, setTotal] = useState(1);

  const [frontCard, setFrontCard] = useState<Card[]>([
    { text: [], gif: [], sticker: [] },
  ]);

  const [backCard, setBackCard] = useState<Card[]>([
    { text: [], gif: [], sticker: [] },
  ]);

  async function fetchStickers(e?: React.FormEvent) {
    e?.preventDefault();

    if (!stickerSearch.trim()) return;

    try {
      const response = await fetch(
        `https://api.giphy.com/v1/stickers/search?api_key=${
          import.meta.env.VITE_GIPHY_API_KEY
        }&q=${encodeURIComponent(stickerSearch)}&limit=8&rating=g`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not get stickers.");
      }

      const stickers: GiphySticker[] = data.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        url: item.images.original_still.url,
      }));

      setStickerResults(stickers);
    } catch (err: any) {
      setError({
        status: true,
        message: err.message || "Could not load stickers.",
      });
    }
  }

  function createSticker(url: string) {
    const currSticker = {
      url,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
    };

    if (cardSide === "Front") {
      setFrontCard((prev) =>
        prev.map((card, index) =>
          index === cardNum - 1
            ? { ...card, sticker: [...card.sticker, currSticker] }
            : card
        )
      );
    } else {
      setBackCard((prev) =>
        prev.map((card, index) =>
          index === cardNum - 1
            ? { ...card, sticker: [...card.sticker, currSticker] }
            : card
        )
      );
    }
  }

  function changeTextColor(color: string) {
    if (cardSide === "Front") {
      setFrontCard((prev) =>
        prev.map((card, index) =>
          index === cardNum - 1
            ? {
                ...card,
                text: card.text.map((cardText, i) =>
                  i === textIndex ? { ...cardText, color } : cardText
                ),
              }
            : card
        )
      );
    } else {
      setBackCard((prev) =>
        prev.map((card, index) =>
          index === cardNum - 1
            ? {
                ...card,
                text: card.text.map((cardText, i) =>
                  i === textIndex ? { ...cardText, color } : cardText
                ),
              }
            : card
        )
      );
    }
  }

  function createSmallText() {
    createTextBox(300, 18);
  }

  function createMediumText() {
    createTextBox(400, 28);
  }

  function createLargeText() {
    createTextBox(600, 38);
  }

  function createTextBox(width: number, fontSize: number) {
    const textTmp = {
      input: "Enter text in the text area",
      width,
      x: 30,
      y: 30,
      fontSize,
      color: "#201002",
    };

    if (cardSide === "Front") {
      setFrontCard((prev) =>
        prev.map((card, index) =>
          index === cardNum - 1
            ? { ...card, text: [...card.text, textTmp] }
            : card
        )
      );
    } else {
      setBackCard((prev) =>
        prev.map((card, index) =>
          index === cardNum - 1
            ? { ...card, text: [...card.text, textTmp] }
            : card
        )
      );
    }
  }

  function deleteText() {
    if (cardSide === "Front") {
      setFrontCard((prev) =>
        prev.map((card, index) =>
          index === cardNum - 1
            ? {
                ...card,
                text: card.text.filter((_, index) => index !== textIndex),
              }
            : card
        )
      );
    } else {
      setBackCard((prev) =>
        prev.map((card, index) =>
          index === cardNum - 1
            ? {
                ...card,
                text: card.text.filter((_, index) => index !== textIndex),
              }
            : card
        )
      );
    }

    setTextArea(false);
  }

  function showTextArea(request: boolean, index: number, input: string) {
    setText(input);
    setTextIndex(index);
    setTextArea(request);
  }

  function changeTextInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);

    if (cardSide === "Front") {
      setFrontCard((prev) =>
        prev.map((card, index) =>
          index === cardNum - 1
            ? {
                ...card,
                text: card.text.map((cardText, i) =>
                  i === textIndex
                    ? { ...cardText, input: e.target.value }
                    : cardText
                ),
              }
            : card
        )
      );
    } else {
      setBackCard((prev) =>
        prev.map((card, index) =>
          index === cardNum - 1
            ? {
                ...card,
                text: card.text.map((cardText, i) =>
                  i === textIndex
                    ? { ...cardText, input: e.target.value }
                    : cardText
                ),
              }
            : card
        )
      );
    }
  }

  function addCard() {
    if (total + 1 <= 20) {
      setTotal(total + 1);
      setFrontCard([...frontCard, { text: [], gif: [], sticker: [] }]);
      setBackCard([...backCard, { text: [], gif: [], sticker: [] }]);
    }
  }

  function deleteCard() {
    if (total - 1 >= 1) {
      setTotal(total - 1);
      setFrontCard((prev) => prev.filter((_, index) => index !== cardNum - 1));
      setBackCard((prev) => prev.filter((_, index) => index !== cardNum - 1));
      setCardNum(cardNum > 1 ? cardNum - 1 : 1);
    }
  }

  function flipCard() {
    if (cardRef.current) {
      cardRef.current.classList.toggle(styles.flip);
      setCardSide((prev) => (prev === "Front" ? "Back" : "Front"));
    }
  }

  function showNextCard() {
    if (cardNum + 1 <= total) {
      setCardNum(cardNum + 1);
    }
  }

  function showPrevCard() {
    if (cardNum - 1 >= 1) {
      setCardNum(cardNum - 1);
    }
  }

  function showTextPanel() {
    setStickerPanel(false);
    setGifPanel(false);
    setTextPanel(true);
  }

  function showGifPanel() {
    setTextPanel(false);
    setStickerPanel(false);
    setGifPanel(true);
  }

  function showStickerPanel() {
    setTextPanel(false);
    setGifPanel(false);
    setStickerPanel(true);
  }

  function hideSidePanel() {
    setTextPanel(false);
    setStickerPanel(false);
    setGifPanel(false);
  }

  const fetchDeckData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/decks/${deckId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setDeckName(data.name);
    } catch (error: any) {
      setError({ status: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeckData();
  }, []);

  return (
    <div className={styles.dashboardContent}>
      <Navbar userId={userId} />

      <div>
        <div className={styles.title}>{deckName || "Flashier Cards"}</div>

        {loading ? (
          <div className={styles.invalidRequest}>Loading request...</div>
        ) : error.status ? (
          <div className={styles.invalidRequest}>{error.message}</div>
        ) : null}

        <div className={styles.toolbar}>
          <button type="button" className={styles.toolOption} onClick={addCard}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </button>

          <button type="button" className={styles.toolOption} onClick={showTextPanel}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              <FontAwesomeIcon icon={faT} />
            </span>
          </button>

          <button type="button" className={styles.toolOption} onClick={showGifPanel}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front} style={{ fontWeight: "600" }}>
              GIF
            </span>
          </button>

          <button type="button" className={styles.toolOption} onClick={showStickerPanel}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              <FontAwesomeIcon icon={faHeart} />
            </span>
          </button>

          <button type="button" className={styles.toolOption} onClick={deleteCard}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </button>

          <button type="button" className={styles.toolOption} onClick={flipCard}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              <FontAwesomeIcon icon={faRightLeft} />
            </span>
          </button>

          <button type="button" className={styles.toolOption}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </span>
          </button>

          <button type="button" className={styles.toolOption} onClick={hideSidePanel}>
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
                      {frontCard[cardNum - 1].text.map((text, textIndex) => (
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
                          onDblClick={() =>
                            showTextArea(true, textIndex, text.input)
                          }
                          onDragEnd={(e) => {
                            const { x, y } = e.target.position();

                            setFrontCard((prev) =>
                              prev.map((card, cardIndex) =>
                                cardIndex === cardNum - 1
                                  ? {
                                      ...card,
                                      text: card.text.map((tmp, i) =>
                                        i === textIndex
                                          ? { ...tmp, x, y }
                                          : tmp
                                      ),
                                    }
                                  : card
                              )
                            );
                          }}
                        />
                      ))}

                      {frontCard[cardNum - 1].sticker.map((sticker, stickerIndex) => (
                        <StickerImage
                          key={stickerIndex}
                          sticker={sticker}
                          index={stickerIndex}
                          onDragEnd={(index, x, y) => {
                            setFrontCard((prev) =>
                              prev.map((card, cardIndex) =>
                                cardIndex === cardNum - 1
                                  ? {
                                      ...card,
                                      sticker: card.sticker.map((tmp, i) =>
                                        i === index ? { ...tmp, x, y } : tmp
                                      ),
                                    }
                                  : card
                              )
                            );
                          }}
                        />
                      ))}
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
                      {backCard[cardNum - 1].text.map((text, textIndex) => (
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
                          onDblClick={() =>
                            showTextArea(true, textIndex, text.input)
                          }
                          onDragEnd={(e) => {
                            const { x, y } = e.target.position();

                            setBackCard((prev) =>
                              prev.map((card, cardIndex) =>
                                cardIndex === cardNum - 1
                                  ? {
                                      ...card,
                                      text: card.text.map((tmp, i) =>
                                        i === textIndex
                                          ? { ...tmp, x, y }
                                          : tmp
                                      ),
                                    }
                                  : card
                              )
                            );
                          }}
                        />
                      ))}

                      {backCard[cardNum - 1].sticker.map((sticker, stickerIndex) => (
                        <StickerImage
                          key={stickerIndex}
                          sticker={sticker}
                          index={stickerIndex}
                          onDragEnd={(index, x, y) => {
                            setBackCard((prev) =>
                              prev.map((card, cardIndex) =>
                                cardIndex === cardNum - 1
                                  ? {
                                      ...card,
                                      sticker: card.sticker.map((tmp, i) =>
                                        i === index ? { ...tmp, x, y } : tmp
                                      ),
                                    }
                                  : card
                              )
                            );
                          }}
                        />
                      ))}
                    </Layer>
                  </Stage>
                </div>
              </div>
            </div>

            <div className={styles.deckNav}>
              <button disabled={cardNum === 1} onClick={showPrevCard}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              <span>
                {cardSide} of Card {cardNum}/{total}
              </span>

              <button disabled={cardNum === total} onClick={showNextCard}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>

          <div
            className={styles.sidePanel}
            style={{ display: textPanel ? "flex" : "none" }}
          >
            <div style={{ display: textArea ? "flex" : "none" }}>
              <div className={styles.sidePanelTitle}>Text Input</div>
              <div className={styles.textInput}>
                <textarea
                  placeholder="Enter text here"
                  value={text}
                  onChange={changeTextInput}
                />
              </div>
            </div>

            <div style={{ display: textArea ? "flex" : "none" }}>
              <div className={styles.sidePanelTitle}>Text Deletion</div>
              <div className={styles.textOptions}>
                <button onClick={deleteText}>Delete</button>
              </div>
            </div>

            <div style={{ display: textArea ? "flex" : "none" }}>
              <div className={styles.sidePanelTitle}>Text Color</div>
              <div className={styles.textOptions}>
                <div style={{ backgroundColor: "#201002" }} onClick={() => changeTextColor("#201002")}></div>
                <div style={{ backgroundColor: "#FF2511" }} onClick={() => changeTextColor("#FF2511")}></div>
                <div style={{ backgroundColor: "#FED43F" }} onClick={() => changeTextColor("#FED43F")}></div>
                <div style={{ backgroundColor: "#016236" }} onClick={() => changeTextColor("#016236")}></div>
                <div style={{ backgroundColor: "#E43480" }} onClick={() => changeTextColor("#E43480")}></div>
                <div style={{ backgroundColor: "#621590" }} onClick={() => changeTextColor("#621590")}></div>
                <div style={{ backgroundColor: "#1F6CB0" }} onClick={() => changeTextColor("#1F6CB0")}></div>
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

          <div
            className={styles.sidePanel}
            style={{ display: gifPanel ? "flex" : "none" }}
          >
            <div>
              <div className={styles.sidePanelTitle}>Gifs</div>
              <p>You can build GIF search the same way as sticker search.</p>
            </div>
          </div>

          <div
            className={styles.sidePanel}
            style={{ display: stickerPanel ? "flex" : "none" }}
          >
            <div>
              <div className={styles.sidePanelTitle}>Stickers</div>

              <form onSubmit={fetchStickers}>
                <input
                  type="text"
                  placeholder="Search stickers"
                  value={stickerSearch}
                  onChange={(e) => setStickerSearch(e.target.value)}
                />
              <div className={styles.textOptions}>
                <button type="submit">Search</button>
              </div>
              </form>

              <div className={styles.stickerGrid}>
                {stickerResults.map((sticker) => (
                  <img
                    key={sticker.id}
                    src={sticker.url}
                    alt={sticker.title}
                    onClick={() => createSticker(sticker.url)}
                    style={{ width: "80px", height: "80px", objectFit: "contain", cursor: "pointer"}}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;