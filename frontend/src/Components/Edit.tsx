import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faT } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faFill } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Stage, Layer, Star, Circle as KonvaCircle, Arrow, Path, Transformer, Rect, RegularPolygon } from "react-konva";
import type Konva from "konva";
import styles from "../Styles/Deck.module.css";

type StickerType = "star" | "heart" | "badge" | "arrow" | "diamond" | "flower";

type Sticker = {
  id: string;
  type: StickerType;
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
};

function Edit() {
  const [error, setError] = useState({ status: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [deckName, setDeckName] = useState<string>("");
  const { userId, deckId } = useParams();

  const cardRef = useRef<HTMLDivElement>(null);
  const trRef = useRef<Konva.Transformer | null>(null);
  const shapeRefs = useRef<Record<string, Konva.Node | null>>({});

  const [cardSide, setCardSide] = useState<"Front" | "Back">("Front");
  const [cardNum, setCardNum] = useState(1);
  const total = 5;

  const [displayStickerMenu, setDisplayStickerMenu] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [frontStickers, setFrontStickers] = useState<Sticker[]>([]);
  const [backStickers, setBackStickers] = useState<Sticker[]>([]);

    const stageWidth = 750;
    const stageHeight = 320;

  const currentStickers = cardSide === "Front" ? frontStickers : backStickers;
  const setCurrentStickers =
    cardSide === "Front" ? setFrontStickers : setBackStickers;

  function flipCard() {
    if (cardRef.current) {
      cardRef.current.classList.toggle(styles.flip);
      setCardSide((prev) => (prev === "Front" ? "Back" : "Front"));
      setSelectedId(null);
      setDisplayStickerMenu(false);
    }
  }

  function showNextCard() {
    if (cardNum + 1 <= total) {
      setCardNum(cardNum + 1);
      setSelectedId(null);
      setDisplayStickerMenu(false);
    }
  }

  function showPrevCard() {
    if (cardNum - 1 >= 1) {
      setCardNum(cardNum - 1);
      setSelectedId(null);
      setDisplayStickerMenu(false);
    }
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
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError({ status: true, message: error.message });
    }
  };

  useEffect(() => {
    fetchDeckData();
  }, []);

  useEffect(() => {
    if (selectedId && trRef.current && shapeRefs.current[selectedId]) {
      trRef.current.nodes([shapeRefs.current[selectedId]!]);
      trRef.current.getLayer()?.batchDraw();
    } else if (trRef.current) {
      trRef.current.nodes([]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId, currentStickers, cardSide]);

  function addSticker(type: StickerType) {
    const id = `shape_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    const newSticker: Sticker = {
      id,
      type,
      x: 120 + Math.random() * 120,
      y: 80 + Math.random() * 80,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
    };

    setCurrentStickers((prev) => [...prev, newSticker]);
    setSelectedId(id);
    setDisplayStickerMenu(false);
  }

  function updateStickerPosition(id: string, x: number, y: number) {
    setCurrentStickers((prev) =>
      prev.map((sticker) =>
        sticker.id === id ? { ...sticker, x, y } : sticker
      )
    );
  }

  function handleTransformEnd(id: string) {
    const node = shapeRefs.current[id];
    if (!node) return;

    setCurrentStickers((prev) =>
      prev.map((sticker) =>
        sticker.id === id
          ? {
              ...sticker,
              x: node.x(),
              y: node.y(),
              rotation: node.rotation(),
              scaleX: node.scaleX(),
              scaleY: node.scaleY(),
            }
          : sticker
      )
    );
  }

  function handleStageClick(e: any) {
    const clickedOnEmpty =
      e.target === e.target.getStage() || e.target.getClassName() === "Rect";

    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  }


  function renderSticker(item: Sticker) {
    const commonProps = {
      key: item.id,
      ref: (node: Konva.Node | null) => {
        shapeRefs.current[item.id] = node;
      },
      x: item.x,
      y: item.y,
      rotation: item.rotation,
      scaleX: item.scaleX,
      scaleY: item.scaleY,
      draggable: true,
      onClick: () => setSelectedId(item.id),
      onTap: () => setSelectedId(item.id),
      onDragEnd: (e: any) =>
        updateStickerPosition(item.id, e.target.x(), e.target.y()),
      onTransformEnd: () => handleTransformEnd(item.id),
    };

    if (item.type === "star") {
      return (
        <Star
          {...commonProps}
          numPoints={5}
          innerRadius={15}
          outerRadius={35}
          fill="#FFD700"
          stroke="#FFA500"
          strokeWidth={2}
        />
      );
    }

    if (item.type === "heart") {
      return (
        <Path
          {...commonProps}
          data="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          scaleX={item.scaleX * 2}
          scaleY={item.scaleY * 2}
          fill="#FF69B4"
        />
      );
    }

    if (item.type === "badge") {
      return (
        <KonvaCircle
          {...commonProps}
          radius={25}
          fill="#FF4444"
          stroke="#fff"
          strokeWidth={3}
        />
      );
    }

    if (item.type === "arrow") {
      return (
        <Arrow
          {...commonProps}
          points={[0, 0, 60, 0]}
          fill="#20C997"
          stroke="#20C997"
          strokeWidth={3}
          pointerLength={12}
          pointerWidth={12}
        />
      );
    }

    if (item.type === "diamond") {
      return (
        <Rect
          {...commonProps}
          width={45}
          height={45}
          fill="#9B5DE5"
          offsetX={22.5}
          offsetY={22.5}
          rotation={item.rotation + 45}
        />
      );
    }

    if (item.type === "flower") {
      return (
        <RegularPolygon
          {...commonProps}
          sides={8}
          radius={28}
          fill="#FF9F1C"
          stroke="#fff"
          strokeWidth={3}
        />
      );
    }

    return null;
  }

  const stickerButtons: { emoji: string; name: string; type: StickerType }[] = [
    { emoji: "⭐", name: "Star", type: "star" },
    { emoji: "❤️", name: "Heart", type: "heart" },
    { emoji: "🔴", name: "Badge", type: "badge" },
    { emoji: "➡️", name: "Arrow", type: "arrow" },
    { emoji: "💎", name: "Diamond", type: "diamond" },
    { emoji: "🌸", name: "Flower", type: "flower" },
  ];

  return (
    <div className={styles.dashboardContent}>
      <Navbar userId={userId} />
      <div>
        <div className={styles.title}>{deckName}</div>

        {loading ? (
          <div className={styles.invalidRequest}>Loading request...</div>
        ) : error.status ? (
          <div className={styles.invalidRequest}>{error.message}</div>
        ) : (
          <div></div>
        )}

        <div className={styles.toolbar}>
          <button type="button" className={styles.toolOption}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </button>

          <button type="button" className={styles.toolOption}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              <FontAwesomeIcon icon={faCircle} />
            </span>
          </button>

          <button type="button" className={styles.toolOption}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              <FontAwesomeIcon icon={faT} />
            </span>
          </button>

          <button type="button" className={styles.toolOption}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              <FontAwesomeIcon icon={faPen} />
            </span>
          </button>

          <div style={{ position: "relative" }}>
            <button
              type="button"
              className={styles.toolOption}
              onClick={() => setDisplayStickerMenu((prev) => !prev)}
            >
              <span className={styles.shadow}></span>
              <span className={styles.edge}></span>
              <span className={styles.front}>
                <FontAwesomeIcon icon={faHeart} />
              </span>
            </button>

            {displayStickerMenu && (
              <div
                style={{ position: "absolute", top: "110%", left: 0, zIndex: 20, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem", padding: "0.75rem", minWidth: "180px", borderRadius: "12px", background: "white", boxShadow: "0 8px 18px rgba(0,0,0,0.15)", }}>
                {stickerButtons.map((s) => (
                  <button
                    key={s.type}
                    type="button"
                    onClick={() => addSticker(s.type)}
                    style={{
                      padding: "8px 10px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      background: "#f8f9fa",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {s.emoji} {s.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="button" className={styles.toolOption}>
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              <FontAwesomeIcon icon={faFill} />
            </span>
          </button>

          <button
            type="button"
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
            className={styles.toolOption}
            onClick={flipCard}
          >
            <span className={styles.shadow}></span>
            <span className={styles.edge}></span>
            <span className={styles.front}>
              <FontAwesomeIcon icon={faRightLeft} />
            </span>
          </button>
        </div>

        <div className={styles.deck}>
          <div className={styles.card} ref={cardRef}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <Stage
                  width={stageWidth}
                  height={stageHeight}
                  onClick={handleStageClick}
                  onTap={handleStageClick}
                >
                  <Layer>
                    <Rect
                      x={0}
                      y={0}
                      width={stageWidth}
                      height={stageHeight}
                      fill="white"
                      cornerRadius={18}
                    />
                    {cardSide === "Front" &&
                      frontStickers.map((item) => renderSticker(item))}
                    <Transformer ref={trRef} />
                  </Layer>
                </Stage>
              </div>

              <div className={styles.cardBack}>
                <Stage
                  width={stageWidth}
                  height={stageHeight}
                  onClick={handleStageClick}
                  onTap={handleStageClick}
                >
                  <Layer>
                    <Rect
                      x={0}
                      y={0}
                      width={stageWidth}
                      height={stageHeight}
                      fill="white"
                      cornerRadius={18}
                    />
                    {cardSide === "Back" &&
                      backStickers.map((item) => renderSticker(item))}
                    <Transformer ref={trRef} />
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
      </div>
    </div>
  );
}

export default Edit;