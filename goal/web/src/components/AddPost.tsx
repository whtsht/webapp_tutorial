import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

async function addPostRequest(title: string, content: string) {
    await fetch("/web/add/", {
        method: "POST",
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });
}

function Content({
    title,
    text,
    setText,
}: {
    title: string;
    text: string;
    setText: (str: string) => void;
}) {
    const [error, setError] = useState(true);
    const [helperText, setHelperText] = useState("");

    useEffect(() => {
        if (text.length > 0) {
            setError(false);
            setHelperText("");
        } else {
            setError(true);
            setHelperText("何か入力してください");
        }
    }, [text]);

    return (
        <DialogContent>
            <DialogContentText>{title}</DialogContentText>
            <TextField
                error={error}
                helperText={helperText}
                fullWidth
                variant="standard"
                onChange={(event) => {
                    setText(event.target.value);
                }}
            />
        </DialogContent>
    );
}

function AddPost({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: () => void;
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [postable, setPostable] = useState(false);

    useEffect(() => {
        if (title.length > 0 && content.length > 0) {
            setPostable(true);
        } else {
            setPostable(false);
        }
    }, [title, content]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>新しい投稿</DialogTitle>

            <Content title="タイトル" text={title} setText={setTitle} />
            <Content title="内容" text={content} setText={setContent} />

            <DialogActions>
                <Button onClick={handleClose}>キャンセル</Button>
                <Button
                    onClick={async () => {
                        await addPostRequest(title, content);
                        handleClose();
                        window.location.reload();
                    }}
                    disabled={!postable}
                >
                    投稿
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddPost;
