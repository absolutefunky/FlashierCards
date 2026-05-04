import { useRef, useState } from "react";
import styles from "../Styles/Canvas.module.css";
import { Stage, Layer, Line, Text } from 'react-konva';
import { Rnd } from "react-rnd";

function Canvas() {
    const [error, setError] = useState({status: false, message: ""});
    const [loading, setLoading] = useState(false);
    //const query = "cute cat"; // change to a state, rn const
    //const [formData, setFormData] = useState({query:""});
    //added
     const [query, setQuery] = useState(""); 
    const queryLimit = 8; //make it an 8 
    const rating = "g"; //keep at g 
    const [gifs, setGifs] = useState<string[]>([]);
    const [selectedGif, setSelectedGif] = useState<string | null>(null);
    const [size, setSize] = useState({width: "300", height: "300"});
    const [position, setPosition] = useState({x: 100, y: 100});

    
  const [name, setName] = useState("");
function handleChange(e:React.ChangeEvent<HTMLInputElement>) {

    setQuery(e.target.value);
}
//  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //  setQuery(e.target.value);
  //}

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetchGifs()
  }
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

            const urls = data.data.map((item: any) => item.images.original.url); //we are getting the urls
            setGifs(urls); //storing the urls locally, so we can access it outside the fetch function  
           // console.log(gifs); //test statement, to see if successful in console            

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
    }

    // console.log(gifs);


    return (
        <>
        <form onSubmit={handleSubmit}>
<label> Gif: 
    <input
    type="text"
    value={query}
    onChange={handleChange}
    />
    </label>
    <input type="submit" />
        
</form>
        <div>
            <button onClick={fetchGifs}>get gifs</button>
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
                            <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                                {gifs.map((url, i) => (
                                    <img
                                        key={i} src={url} alt=""
                                        style={{width: "100px", height: "100px", objectFit: "cover", cursor: "pointer"}}
                                        onClick={() => setSelectedGif(url)}
                                    />
                                ))}
                            </div>
                            {selectedGif && (
                                <Rnd
                                    lockAspectRatio
                                    size={{width: size.width, height: size.height}}
                                    position={{x: position.x, y: position.y}}
                                    onDragStop={(_, d) => {
                                        setPosition({x: d.x, y: d.y});
                                    }}
                                    onResizeStop={(_, _dir, ref, _delta, pos) => {
                                        setSize({width: ref.style.width, height: ref.style.height});
                                        setPosition(pos);
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
                                    <img
                                        src={selectedGif} alt=""
                                        style={{pointerEvents: "none", width: "100%", height: "100%", objectFit: "cover"}}
                                    />
                                </Rnd>
                            )}
                        </div>
                }
               
            </div>   
        </div>
        </>
    );

}

export default Canvas;