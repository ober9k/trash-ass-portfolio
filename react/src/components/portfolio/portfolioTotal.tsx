import styles from "./portfolioTotal.module.css";

type Props = {
  total:       number,
  currency:    string,
  gain:        number,
  gainPercent: number,
};

function PortfolioTotal(props: Props) {
  const { total, currency, gain, gainPercent } = props;

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
            +${gain.toFixed(2)}
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
