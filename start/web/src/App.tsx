import { useState } from "react";
import Header from "./components/Header";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";

function App() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Header
                handleOpen={() => {
                    setOpen(true);
                }}
            />
            <PostList />
            <AddPost open={open} handleClose={() => setOpen(false)} />
        </>
    );
}

export default App;
