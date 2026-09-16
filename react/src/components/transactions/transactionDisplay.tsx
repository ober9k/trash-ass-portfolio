import type { Transaction } from "@shared/types/transaction.ts";

function parseValue(value: number): string {
  return parseFloat(value.toFixed(2)).toLocaleString();
}

type Props = {
  transaction: Transaction,
};

function TransactionDisplay(props: Props) {
  const { transaction } = props;

  return (
    <>
      <article className={"flex gap-2 m-2 p-2 border border-gray-200 rounded bg-gray-100"}>
        <ul>
          <li>
            Purchased At:&nbsp;
            <strong>{transaction.purchasedAt}</strong>
          </li>
          <li>
            Quantity:&nbsp;
            <strong>{transaction.quantity}</strong>
          </li>
          <li>
            Price:&nbsp;
            <strong>${parseValue(transaction.price)}</strong>
          </li>
          <li>
            Total Cost:&nbsp;
            <strong>${parseValue(transaction.total)}</strong>
          </li>
        </ul>
      </article>
    </>
  );
}

export default TransactionDisplay;
