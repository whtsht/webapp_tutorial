import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

function Header({ handleOpen }: { handleOpen: () => void }) {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    My Blog
                </Typography>
                <Button color="inherit" onClick={handleOpen}>
                    投稿する
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
