import { useState } from "react";

function ChangePassword() {
const [passwordOverlay, setPasswordOverlay] = useState(false);
function showPasswordOverlay(request:boolean){
    setPasswordOverlay(request);
}
    return (
        <div id="profile-content">
            <input type="password" placeholder="Enter Current Password"/>
            <input type="password" placeholder="Enter New Password" />
            <input type="password" placeholder="Confirm New Password" />
            <button onClick={()=> showPasswordOverlay(true)}>Confirm Password Change</button>
            {
                passwordOverlay && (
                    <div className="overlay">
                      <div className="signup-subtitle"> Are you completely sure you'd like to change your password?</div>
                        <button onClick={()=>showPasswordOverlay(false)}>
                                YES
                        </button>
                        <button onClick={()=>showPasswordOverlay(false)}>
                            NO
                        </button>
                       
                    </div>
                )
            }

        </div>
    );
}

export default ChangePassword