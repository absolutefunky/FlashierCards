import type Profile from "../Interfaces/Profile";

function AccountInformation(prop: Profile) {
    return (
        <div id="profile-content">
            account information
            id: {prop.id}
            userid: {prop.userId}
            animation type: {prop.animationType}
            background: {prop.backgroundColor}
        </div>
    );
}

export default AccountInformation