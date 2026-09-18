import TokenIcon from "@/components/tokens/tokenIcon.tsx";
import PercentDisplay from "@/components/utils/percentDisplay.tsx";
import type { Token } from "@shared/types/token.ts";
import type { TransactionTotal } from "@shared/types/transaction.ts";

type Props = {
  transactionTotal: TransactionTotal,
};

function TransactionSummary(props: Props) {
  const { transactionTotal: summary } = props;

  const token: Partial<Token> = {
    symbol: summary.symbol,
    name:   summary.name,
  };

  return (
    <>
      <article className={"m-2 p-2 flex gap-1 flex-col bg-gray-200 border-1 border-gray-300 rounded"}>
        <header className={"flex justify-center p-1"}>
          <TokenIcon token={token} size="sm" />
          <h1 className={"ml-1 text-2xl"}>{summary.name}</h1>
        </header>
        <section className={"flex justify-center p-1"}>
          <div className={"grow"}>
              <h3 className={"py-1 text-xs text-center text-gray-600 font-medium uppercase"}>Total Profit</h3>
              <h4 className={"text-center text-sm font-bold"}>
                ${(summary.marketValue - 75 - summary.totalValue).toFixed(2)} USD
                <PercentDisplay marketValue={summary.marketValue} purchaseValue={summary.totalValue} />
              </h4>
          </div>
        </section>
        <section className={"flex justify-center p-1"}>
          <div className={"grow"}>
            <h3 className={"py-1 text-xs text-center text-gray-600 font-medium uppercase"}>Holdings</h3>
            <h4 className={"text-center text-sm font-bold"}>{summary.quantity.toFixed(4)} {summary.symbol.toUpperCase()}</h4>
          </div>
          <div className={"grow"}>
            <h3 className={"py-1 text-xs text-center text-gray-600 font-medium uppercase"}>Market Value</h3>
            <h4 className={"text-center text-sm font-bold"}>${summary.marketValue.toFixed(2)} USD</h4>
          </div>
          <div className={"grow"}>
            <h3 className={"py-1 text-xs text-center text-gray-600 font-medium uppercase"}>Total Cost</h3>
            <h4 className={"text-center text-sm font-bold"}>${summary.totalValue.toFixed(2)} USD</h4>
          </div>
        </section>
      </article>
    </>
  );
}

export default TransactionSummary;
