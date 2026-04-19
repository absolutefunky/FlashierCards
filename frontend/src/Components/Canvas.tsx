import { Stage, Layer, Text, Transformer } from 'react-konva';
import { useState, useRef, useEffect} from 'react';

function Canvas() {
    const [position, setPosition] = useState({x: 40, y: 40});
    const [text, setText] = useState("Click to resize. Double click to edit.");
    const [width, setWidth] = useState(200);
    const [selected, setSelected] = useState(false);
    const textRef: any = useRef(null);
    const trRef: any = useRef(null);

    useEffect(() => {
        if (selected && trRef.current) {
            trRef.current.nodes([textRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [selected]);

    return (
        <>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onClick={(e) => {
                    if (e.target === e.target.getStage()) {
                        setSelected(false);
                    }
                }}
            >
                <Layer>
                    <Text
                        x={position.x}
                        y={position.y}
                        width={width}
                        text={text}
                        fontSize={20}
                        ref={textRef}
                        draggable
                        onClick={() => {
                            setSelected(true);
                        }}
                        onDragEnd={(e) => {
                            setPosition({x: e.target.x(), y: e.target.y()});
                        }}
                        onTransform={() => {
                            const node = textRef.current;
                            setWidth(node.width() * node.scaleX());
                            node.scaleX(1);
                        }}
                    />
                    { selected && (
                        <Transformer
                            ref={trRef}
                            rotateEnabled={false}
                            flipEnabled={false}
                            enabledAnchors={["middle-left", "middle-right"]}
                            boundBoxFunc={(oldBox, newBox) => {
                                if (newBox.width < 150) {
                                    return oldBox;
                                }
                                return newBox;
                            }}
                        />
                    )}
                </Layer>
            </Stage>
            <textarea
                onChange={(e) => {
                    setText(e.target.value)
                }}
                style={{
                    position: "absolute",
                    top: "100px",
                    left: "100px"
                }}
            />
        </>
    );
}

export default Canvas;