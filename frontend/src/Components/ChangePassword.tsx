import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChangePassword() {
const [passwordOverlay, setPasswordOverlay] = useState(false);
function showPasswordOverlay(request:boolean){
    setPasswordOverlay(request);
}
    return (
        <div id="password-content">
        <span>Enter the information below to confirm password change!</span>
            <div className="signup-subtitle">Current Password</div>
            <input className= "password-confirm" type="password"/>
            <div className="signup-subtitle">New Password</div>
            <input className="password-confirm" type="password" />
            <div className="signup-subtitle">New Password</div>
            <input className="password-confirm" type="password" />
            <button className="input-button" onClick={()=> showPasswordOverlay(true)}>
                <span className="shadow-input"></span>
                <span className="edge-input"></span>
                <span className="front-input">CREATE</span>
            </button>
            {
                passwordOverlay && (
                    <div className="password-overlay">
                      <div className="signup-subtitle"> Are you completely sure you'd like to change your password?</div>
                        <button className="input-button" onClick={()=>showPasswordOverlay(false)}>
                               <span className="shadow-input"></span>
                                <span className="edge-input"></span>
                                <span className="front-input">
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                        </button>
                        <button className="input-button" onClick={()=>showPasswordOverlay(false)}>
                            <span className="shadow-input"></span>
                            <span className="edge-input"></span>
                            <span className="front-input">
                                <FontAwesomeIcon icon={faX} />
                            </span>
                        </button>
                       
                    </div>
                )
            }

        </div>
    );
}

export default ChangePassword