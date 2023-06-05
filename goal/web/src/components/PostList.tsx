import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";

interface Post {
    title: string;
    content: string;
}

async function deletePost(title: string) {
    await fetch("/web/delete/", {
        method: "POST",
        headers: {
            "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
            title: title,
        }),
    });
}

function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        (async () => {
            const response = await fetch("/web/get/");
            const resPosts = await response.json();
            console.log(resPosts);
            setPosts(resPosts);
        })();
    }, []);

    const Posts = posts.map((post, index) => {
        return (
            <Grid item key={index}>
                <Card
                    sx={{ minWidth: 275 }}
                    style={{
                        padding: "10px",
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ padding: "10px" }}
                    >
                        {post.content}
                    </Typography>
                    <CardActions
                        sx={{
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            size="small"
                            onClick={async () => {
                                await deletePost(post.title);
                                window.location.reload();
                            }}
                        >
                            <DeleteIcon></DeleteIcon>
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    });

    return (
        <Grid container spacing={2} style={{ margin: "5vh" }}>
            {Posts}
        </Grid>
    );
}

export default PostList;
