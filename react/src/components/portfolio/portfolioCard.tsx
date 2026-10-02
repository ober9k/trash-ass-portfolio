import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import PercentDisplay from "@/components/utils/percentDisplay.tsx";
import PropertyDisplay from "@/components/utils/propertyDisplay.tsx";
import { Alert } from "@mui/material";
import type { Portfolio } from "@shared/types/portfolio.ts";
import styles from "@/components/portfolio/portfolioCard.module.css";

type Props = {
  portfolio: Portfolio | null,
};

function PortfolioCard(props: Props) {
  const { portfolio } = props;

  const isPortfolioNull = () => portfolio === null;

  const currentValue = portfolio?.currentValue ?? 0;
  const initialValue = portfolio?.initialValue ?? 0;

  return (
    <article className={styles.card}>
      {isPortfolioNull() && (
        <section className={styles.cardMessage}>
          <Alert severity="warning">
            Unable to load portfolio summary.
          </Alert>
        </section>
      )}
      <section className={styles.cardContent}>
        <PropertyDisplay title={"Market Value"}>
          <CurrencyDisplay currentValue={currentValue} />
          <PercentDisplay currentValue={currentValue} initialValue={initialValue} />
        </PropertyDisplay>
      </section>
    </article>
  );
}

export default PortfolioCard;
