import React, { useRef, useState } from "react";
import App from "./App";

const Entry = () => {
	const usernameEl = useRef<HTMLInputElement>(null!);
	const locationEl = useRef<HTMLInputElement>(null!);
	const [username, setUsername] = useState('');
	const [location, setLocation] = useState('ws://localhost:443/websocket');

	const handlePlayClick = () => {
		if (usernameEl.current.value) {
			setUsername(usernameEl.current.value);
		}
	};

	const handleLocationChange = () => {
		if (locationEl.current.value) {
			setLocation(locationEl.current.value);
		}
	};

	return (
		<>
			{username ? <App username={username} location={location} /> : 
				<div>
					username: <input ref={usernameEl} type="text" />
					location: <input ref={locationEl} type="text" placeholder="ws://localhost:443/websocket" onChange={handleLocationChange} />
					<button onClick={handlePlayClick}>Play</button>
				</div>
			}
		</>
	);
};

export default Entry;
