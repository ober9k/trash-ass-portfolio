import { Urls } from "@/config/urls.ts";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { MenuIcon, User } from "lucide-react";
import type { ReactNode } from "react";

function LeftSlot() {
  return (<>
    <IconButton size="large" color="inherit" edge="start" aria-label="menu">
      <MenuIcon />
    </IconButton>
  </>);
}

function RightSlot() {
  return (<>
    <IconButton size="large" color="inherit" edge="end" aria-label="user">
      <Link to={Urls.AuthSignIn}>
        <User />
      </Link>
    </IconButton>
  </>);
}

type Props = {
  leftSlot?:  ReactNode,
  children:   ReactNode,
  rightSlot?: ReactNode,
}

function NavigationBar(props: Props) {
  const { leftSlot = <LeftSlot />, children, rightSlot = <RightSlot /> } = props;

  return (<>
    <Box className="grow">
      <AppBar position="static">
        <Toolbar>
          {leftSlot}
          <Box className="flex grow justify-center">
            {children}
          </Box>
          {rightSlot}
        </Toolbar>
      </AppBar>
    </Box>
    
      {/* <nav className={"flex gap-2 p-1 bg-gray-200 border-b border-gray-300"}>
        <div className={"p-2.5 text-md min-w-10"}>
          {leftItem}
        </div>
        <div className={"flex-grow py-2 px-4 font-medium"}>
          <h1 className={"flex justify-center items-center gap-2"}>
            {children}
          </h1>
        </div>
        <div className={"p-2.5 text-md min-w-10"}>
          {rightItem}
        </div>
      </nav> */}
    </>
  );
}

export default NavigationBar;
