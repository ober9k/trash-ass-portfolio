import { Urls } from "@/config/urls";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import type { Asset } from "@shared/types/portfolio";
import { Link } from "@tanstack/react-router";

type Props = {
  asset: Asset,
};

function BackButton(props: Props) {
  const { asset } = props;

  return (<>
    <Link to={Urls.Holding} params={{ holdingId: asset.id }}>
      <IconButton size="large" color="inherit" edge="start" aria-label="Go Back">
        <ArrowBackIcon />
      </IconButton>  
    </Link>
  </>);
}

export default BackButton;
