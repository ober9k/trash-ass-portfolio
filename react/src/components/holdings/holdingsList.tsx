import HoldingCard from "@/components/holdings/holdingCard.tsx";
import styles from "@/components/holdings/holdingsList.module.css";
import { Alert } from "@mui/material";
import type { Holding } from "@shared/types/portfolio.ts";

type Props = {
  holdings: Holding[] | null,
}

function HoldingsList(props: Props) {
  const { holdings } = props;

  const isHoldingsNull  = () => holdings === null; /* distinguish between not retrieved and empty */
  const isHoldingsEmpty = () => holdings && holdings.length === 0;

  return (
    <article className={styles.card}>
      {isHoldingsNull() || isHoldingsEmpty() ? (
        <section className={styles.cardMessage}>
          {isHoldingsNull() && (
            <Alert severity="warning">
              Unable to load portfolio holdings.
            </Alert>
          )}
          {isHoldingsEmpty() && (
            <Alert severity="warning">
              Your portfolio is currently empty.<br/>
            </Alert>
          )}
        </section>
      ) : (
        <section className={styles.cardContent}>
          {holdings.map((holding, key) => (
            <HoldingCard holding={holding} key={key} />
          ))}
        </section>
      )}
    </article>
  );
}

export default HoldingsList;
