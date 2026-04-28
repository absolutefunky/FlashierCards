import { useRef, useState } from "react";
import styles from "../Styles/Canvas.module.css";
import { Stage, Layer, Line, Text } from 'react-konva';
import { Rnd } from "react-rnd";

function Canvas() {
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    const query = "cute cat";
    const queryLimit = 5;
    const rating = "g";
    const [gifs, setGifs] = useState<string[]>([]);
    const [size, setSize] = useState({width: "300", height: "300"});
    const [position, setPosition] = useState({x: 100, y: 100});

    const fetchGifs = async () => {
        setLoading(true);

        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${query}&limit=${queryLimit}&rating=${rating}`);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setLoading(false);
            console.log(data);

            const urls = data.data.map((item: any) => item.images.original.url);
            setGifs(urls);
            console.log(gifs);            

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    }

    console.log(gifs);


    return (
        <div>
            <button onClick={fetchGifs}>get giphs</button>
            <div>
                { (loading) ?
                    <div>
                        Loading request...
                    </div>
                :
                    (error.status) ?
                        <div>{error.message}</div>
                    :
                        <div>
                            <Rnd
                                lockAspectRatio
                                size={{width: size.width, height: size.height}}
                                position={{x: position.x, y: position.y}}
                                onDragStop={(_, d) => {
                                    setPosition({x: d.x, y: d.y});
                                }}
                                onResizeStop={(e, direction, ref, delta, position) => {
                                    setSize({width: ref.style.width, height: ref.style.height});
                                    setPosition(position);
                                }}
                                enableResizing={{
                                    top: false,
                                    bottom: false,
                                    right: false,
                                    left: false,
                                    topLeft: true,
                                    topRight: true,
                                    bottomLeft: true,
                                    bottomRight: true
                                }}
                            >
                                <div style={{backgroundColor: "red", width: "100%", height: "100%"}}>
                                    {gifs[2] &&
                                        <img
                                            style={{pointerEvents: "none", width: "100%", height: "100%", objectFit: "cover" }}
                                            key={gifs[2]} src={gifs[2]} alt=""  />
                                    }
                                </div>
                            </Rnd>
                           
                        </div>
                }
               
            </div>   
        </div>
    );
}

export default Canvas;