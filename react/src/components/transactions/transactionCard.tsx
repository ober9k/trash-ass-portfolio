import AssetDisplay from "@/components/utils/assetDisplay.tsx";
import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import PropertyDisplay from "@/components/utils/propertyDisplay.tsx";
import { type AssetTransaction } from "@shared/types/transaction.ts";

type Props = {
  transaction: AssetTransaction,
};

function TransactionCard(props: Props) {
  const { transaction } = props;

  console.log("transaction", transaction);

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
            <AssetDisplay asset={transaction.asset} quantity={transaction.quantity} />
          </PropertyDisplay>
          <PropertyDisplay title={"Buy Price"}>
            <CurrencyDisplay currentValue={transaction.price} />
          </PropertyDisplay>
          <PropertyDisplay title={"Total Cost"}>
            <CurrencyDisplay currentValue={transaction.total} />
          </PropertyDisplay>
        </section>
      </article>
    </>
  );
}

export default TransactionCard;
