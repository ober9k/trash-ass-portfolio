import AltCardHeader from "@/components/miscellaneous/altCardHeader";
import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import GainDisplay from "@/components/utils/gainDisplay";
import { Alert, Card, CardContent, Typography } from "@mui/material";
import type { Portfolio } from "@shared/types/portfolio.ts";

type Props = {
  portfolio: Portfolio | null,
};

function PortfolioCard(props: Props) {
  const { portfolio } = props;

  const isPortfolioNull = () => portfolio === null;

  const currentValue = portfolio?.currentValue ?? 0;
  const initialValue = portfolio?.initialValue ?? 0;

  return (<>
    <Card>
      <AltCardHeader title="Main Portfolio" />
      <CardContent>
        {isPortfolioNull() ? (
          <Alert severity="warning">
            Unable to load portfolio summary.
          </Alert>
        ) : (<>
          <Typography variant="h4" component="h4" className="pb-4 text-4xl">
            <CurrencyDisplay currentValue={currentValue} />
          </Typography>
          <Typography variant="h6" component="h6" className="text-sm">
            <GainDisplay currentValue={currentValue} initialValue={initialValue} />
          </Typography>
        </>)}
      </CardContent>
    </Card>
  </>);
}

export default PortfolioCard;
