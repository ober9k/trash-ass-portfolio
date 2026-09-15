import { type Portfolio } from "@shared/types/portfolio.ts";
import styles from "./portfolioTotal.module.css";

type Props = {
  portfolio: Portfolio,
};

function PortfolioTotal(props: Props) {
  const { total, currency, gainTotal, gainPercent } = props.portfolio;

  return (
    <>
      <article className={styles.wrapper}>
        <h1 className={styles.heading}>
          Total Value
        </h1>
        <section className={styles.total}>
          <span className={styles.totalValue}>
            ${total.toFixed(2)}
          </span>
          <span className={styles.totalCurrency}>
            {currency}
          </span>
        </section>
        <section className={styles.gain}>
          <span className={styles.gainValue}>
            +${gainTotal.toFixed(2)}
          </span>
          <span className={styles.gainPercent}>
            +${gainPercent.toFixed(2)}%
          </span>
        </section>
      </article>
    </>
  );
}

export default PortfolioTotal;
