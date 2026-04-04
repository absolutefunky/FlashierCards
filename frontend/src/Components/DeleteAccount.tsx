import { useState } from 'react';

function DeleteAccount() {
	const [showOverlay, setShowOverlay] = useState(false);

	function showProfileOverlay(request: boolean) {
        setShowOverlay(request);
    }
	
    return (
		<>
			<div id="profile-content">
				<div>Delete Account</div>
				<div>If you no longer wish to use Flashier Cards, you can permanently delete your account.</div>
				<button onClick={() => showProfileOverlay(true)}>Delete My Account</button>	
			</div>
			<div style={{display: showOverlay ? "flex" : "none"}}  className="overlay">
				<button onClick={() => showProfileOverlay(false)}>X</button>
				<div>overlay content</div>
			</div>
		</>
    );
}

export default DeleteAccount
