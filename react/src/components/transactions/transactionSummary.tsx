import TokenIcon from "@/components/tokens/tokenIcon.tsx";
import PercentDisplay from "@/components/utils/percentDisplay.tsx";
import type { Token } from "@shared/types/token.ts";
import type { TransactionTotal } from "@shared/types/transaction.ts";

function PropertyDisplay({ title, children }) {
  return (
    <>
      <div className={"grow"}>
        <h3 className={"py-1 text-xs text-center text-gray-600 font-medium uppercase"}>
          {title}
        </h3>
        <h4 className={"text-center text-sm font-bold"}>
          {children}
        </h4>
      </div>
    </>
  );
}

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
            <PropertyDisplay title={"Total Profit"}>
              ${(summary.marketValue - summary.totalValue).toFixed(2)} USD
              <PercentDisplay marketValue={summary.marketValue} purchaseValue={summary.totalValue} />
            </PropertyDisplay>
          </div>
        </section>
        <section className={"flex justify-center p-1"}>
          <PropertyDisplay title={"Holdings"}>
            {summary.quantity.toFixed(4)} {summary.symbol.toUpperCase()}
          </PropertyDisplay>
          <PropertyDisplay title={"Market Value"}>
             ${summary.marketValue.toFixed(2)} USD
          </PropertyDisplay>
          <PropertyDisplay title={"Total Cost"}>
            ${summary.totalValue.toFixed(2)} USD
          </PropertyDisplay>
        </section>
      </article>
    </>
  );
}

export default TransactionSummary;
