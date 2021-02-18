import React, { useContext, useRef, useState } from "react";
import { StoreContext } from "../context/store";
import { StoreState } from "../types/context";
import Controller from "../controllers/control";
import View from "./View";

const App = () => {
	const { clientRef, dispatch } = useContext<StoreState>(StoreContext);
	const inputEl = useRef<HTMLInputElement>(null!);
	const [isConnected, setIsConnected] = useState(false);
	const controller = new Controller(dispatch);

	const handlePlayClick = () => {
		if (window.WebSocket) {
			clientRef.current.connect(
				{ username: inputEl.current.value },
				"ws://10.28.1.110:443/websocket",
				() => {
					setIsConnected(true);
					controller.setUp(clientRef.current);
				}
			);
		} else {
			alert("WebSocket not supported by your browser!");
		}
	};

	return (
		<div>
			{isConnected ? null : (
				<div>
					username: <input ref={inputEl} type="text" />{" "}
					<button onClick={handlePlayClick}>Play</button>
				</div>
			)}
			{isConnected ? <View /> : null}
		</div>
	);
};

export default App;
