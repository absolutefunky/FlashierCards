import { Rnd } from "react-rnd";
import { useState } from "react";

function TextObject(props: any) {
    const {key, bold, italic, underline, fontSize} = props;
    const [size, setSize] = useState({width: 250, height: 53});
    const [position, setPosition] = useState({x: 20, y: 20});
    const [focus, setFocus] = useState(true);
    const [hover, setHover] = useState(false);
    const [drag, setDrag] = useState(false);
    
    function handlePosition(event: any, direction: any) {
        setDrag(false);
        setPosition({x: direction.x, y: direction.y});
    }

    function handleSize(event: any, direction: any, ref: any, delta: any, position: any) {
        setSize({width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10)});
        setPosition({x: position.x, y: position.y});
    }

    return (
        <div id="board">
            <Rnd
                style={{
                    borderRadius: "3px",
                    border: hover && !focus ? "2px solid #B3DEF4" : (focus ? "2px solid #004A94" : "2px solid white"),
                }}
                className="rnd"
                minWidth={250}
                minHeight={53}
                bounds="parent"
                size={{width: size.width, height: size.height}}
                position={{x: position.x, y: position.y}}
                onDragStart={() => setDrag(true)}
                onDragStop={handlePosition}
                onResizeStop={handleSize}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                enableResizing={{
                    top: false,
                    right: false,
                    bottom: false,
                    left: false,
                    topRight: true,
                    bottomRight: true,
                    bottomLeft: true,
                    topLeft: true
                }}
            >
                <textarea
                    style={{
                        cursor: drag ? "move" : "auto",
                        fontWeight: bold ? "bold" : "normal",
                        fontStyle: italic ? "italic" : "normal",
                        textDecoration: underline ? "underline" : "none",
                        fontSize: fontSize + "px"
                    }}
                    autoFocus={focus}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    placeholder="Type here!"
                    className="text-element"
                />
            </Rnd>
        </div>
    );
}

export default TextObject