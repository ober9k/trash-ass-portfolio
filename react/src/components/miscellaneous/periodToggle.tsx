import styles from "@/components/miscellaneous/periodToggle.module.css";
import { useState } from "react";

export type Period = "1H" | "1D" | "1W" | "1M" | "1Y" | "All";

const periods: Period[] = [
  "1H", "1D", "1W", "1M", "1Y", "All",
];

type Props = {
  onToggle: (Period) => void,
}

function PeriodToggle(props: Props) {
  const { onToggle } = props;
  const [ period, setPeriod ] = useState<Period>("All");

  const toggle = (p: Period) => {
    onToggle(p);
    setPeriod(p);
  };

  const getToggleItemClass = (p: Period) => {
    return p === period ? styles.activeToggleItem : styles.toggleItem;
  };

  return (
    <>
      <nav className={styles.toggle}>
        <ol className={styles.toggleList}>
          {periods.map((p, key) => (
            <li key={key}>
              <span onClick={() => toggle(p)} className={getToggleItemClass(p)}>
                {p}
              </span>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export default PeriodToggle;
