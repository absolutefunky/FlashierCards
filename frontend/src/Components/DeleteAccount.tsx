import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function DeleteAccount() {
	const [showOverlay, setShowOverlay] = useState(false);

	function showProfileOverlay(request: boolean) {
        setShowOverlay(request);
    }
	
    return (
		<>
			<div id="profile-content">
				<div className="signup-subtitle">Delete Account</div>
				<div className="profile-text">If you no longer wish to use Flashier Cards, you can permanently delete your account.</div>
				<button id="blue-btn" onClick={() => showProfileOverlay(true)}>Delete My Account</button>	
			</div>
			<div style={{display: showOverlay ? "flex" : "none"}}  className="overlay">
				<div className="cancel-action"><FontAwesomeIcon icon={faCircleXmark} onClick={() => showProfileOverlay(false)} /></div>
				<div className="signup-subtitle" style={{fontWeight: 600}}>Delete My Account</div>
				<div className="profile-text">Are you sure you want to delete your account? This action cannot be undone.</div>
				<form action="">
					<div>
						<div className="signup-subtitle">Please enter your password to confirm.</div>
						<input type="password" />
					</div>
					<button id="blue-btn">Delete</button>
				</form>
			</div>
		</>
    );
}

export default DeleteAccount
