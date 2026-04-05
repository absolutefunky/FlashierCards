import { Rnd } from "react-rnd";
import { useState } from "react";

function TextObject() {
    const [size, setSize] = useState({width: 200, height: 50});
    const [position, setPosition] = useState({x: 10, y: 10});
    
    function handlePosition(event: any, direction: any) {
        setPosition({x: direction.x, y: direction.y});
    }

    function handleSize(event: any, direction: any, ref: any, delta: any, position: any) {
        setSize({width:parseInt(ref.style.width,10), height: parseInt(ref.style.height,10)});
        setPosition({x: position.x, y: position.y});
    }

    return (
        <div id="board">
            <Rnd
                style={{backgroundColor: "red", display: "flex"}}
                size={{width: size.width, height: size.height}}
                position={{x: position.x, y: position.y}}
                onDragStop={handlePosition}
                onResizeStop={handleSize}
                bounds="parent"
            >
                <input type="text" style={{width: "100%", height: "100%"}} />
            </Rnd>
        </div>
    );
}

export default TextObject