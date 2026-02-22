import type { PropsWithChildren } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router";

export function Layout(props: PropsWithChildren) {
    const userInfo = useAppSelector(state => state.auth.userInfo);

    return <Stack>
        <AppBar position="static">
            <Toolbar>
                <Box display='flex' justifyContent="space-between" flexGrow={1}>
                    <Box/>
                    <Box>
                        {!userInfo && <Link to='/login'><Button>Login</Button></Link>}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
        {props.children}
    </Stack>
}