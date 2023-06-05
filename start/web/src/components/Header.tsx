import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

function Header() {
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
            </Toolbar>
        </AppBar>
    );
}

export default Header;
