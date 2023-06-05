import { useState, useEffect } from "react";

function App() {
    const [text, setText] = useState("");
    useEffect(() => {
        (async () => {
            const response = await fetch("/web/");
            const text = await response.text();
            setText(text);
        })();
    }, []);

    return (
        <>
            <h1>{text}</h1>
        </>
    );
}

export default App;
