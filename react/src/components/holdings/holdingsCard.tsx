import HoldingItem from "@/components/holdings/holdingItem";
import AltCardHeader from "@/components/miscellaneous/altCardHeader";
import { Alert, Card, CardContent } from "@mui/material";
import type { Holding } from "@shared/types/portfolio.ts";

type Props = {
  holdings: Holding[] | null,
}

function HoldingsCard(props: Props) {
  const { holdings } = props;

  const isHoldingsNull  = () => holdings === null; /* distinguish between not retrieved and empty */
  const isHoldingsEmpty = () => holdings && holdings.length === 0;

  return (<>
    <Card>
      <AltCardHeader title="Holdings" />
      <CardContent>
        {isHoldingsNull() || isHoldingsEmpty() ? (
        <section>
          {isHoldingsNull() && (
            <Alert severity="warning">
              Unable to load portfolio holdings.
            </Alert>
          )}
          {isHoldingsEmpty() && (
            <Alert severity="warning">
              Your portfolio is currently empty.<br />
            </Alert>
          )}
          </section>
        ) : (
          <section>
            {holdings && holdings.map((holding, key) => (
              <HoldingItem holding={holding} key={key} />
            ))}
          </section>
        )}
      </CardContent>
    </Card>
    </>
  );
}

export default HoldingsCard;
