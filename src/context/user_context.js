import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
	const { loginWithRedirect, logout, user } = useAuth0();

	const [myUser, setMyUser] = useState(null);

	useEffect(() => {
		let userDetails = JSON.parse(localStorage.getItem(user?.nickname)) || {};
		setMyUser({ ...user, ...userDetails });
	}, [user]);

	return (
		<UserContext.Provider
			value={{ loginWithRedirect, logout, myUser, setMyUser }}
		>
			{children}
		</UserContext.Provider>
	);
};
// make sure use
export const useUserContext = () => {
	return useContext(UserContext);
};
