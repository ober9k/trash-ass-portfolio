import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import TokenDisplay from "@/components/utils/tokenDisplay.tsx";
import type { Transaction } from "@shared/types/transaction.ts";

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
  transaction: Transaction,
};

function TransactionDisplay(props: Props) {
  const { transaction } = props;

  return (
    <>
      <article className={"m-2 p-2 flex gap-1 flex-col bg-gray-100 border-1 border-gray-300 rounded"}>
        <section className={"flex justify-center p-1"}>
          <div className={"grow"}>
            <PropertyDisplay title={"Purchased"}>
              {transaction.purchasedAt.toLocaleString().replace("T", " @ ").replace(".000Z", "")}
            </PropertyDisplay>
          </div>
        </section>
        <section className={"flex justify-center p-1"}>
          <PropertyDisplay title={"Quantity"}>
            <TokenDisplay {...transaction} />
          </PropertyDisplay>
          <PropertyDisplay title={"Buy Price"}>
            <CurrencyDisplay value={transaction.price} />
          </PropertyDisplay>
          <PropertyDisplay title={"Total Cost"}>
            <CurrencyDisplay value={transaction.total} />
          </PropertyDisplay>
        </section>
      </article>
    </>
  );
}

export default TransactionDisplay;
