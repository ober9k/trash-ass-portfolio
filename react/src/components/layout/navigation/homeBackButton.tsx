import { Urls } from "@/config/urls.ts";
import { IconButton } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

function HomeBackButton() {
  return (<>
    <IconButton size="large" color="inherit" edge="start" aria-label="back">
      <Link to={Urls.Portfolio}>
        <ArrowLeft />
      </Link>
    </IconButton>
  </>);
}

export default HomeBackButton();
