import Header from "./components/Header";
import { useState, useEffect } from "react";

function App() {
    const [text, setText] = useState("");
    useEffect(() => {
        (async () => {
            const response = await fetch("/web");
            const respText = await response.text();
            setText(respText);
        })();
    }, []);
    return (
        <>
            <Header />
            <h1>{text}</h1>
        </>
    );
}

export default App;
