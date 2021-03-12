import React, { useRef, useState } from "react";
import App from "./App";

const Entry = () => {
	const inputEl = useRef<HTMLInputElement>(null!);
	const [username, setUsername] = useState('');

	const handlePlayClick = () => {
		if (inputEl.current.value) {
			setUsername(inputEl.current.value);
		}
	};

	return (
		<>
			{username ? <App username={username} /> : 
				<div>
					username: <input ref={inputEl} type="text" />{" "}<button onClick={handlePlayClick}>Play</button>
				</div>
			}
		</>
	);
};

export default Entry;
