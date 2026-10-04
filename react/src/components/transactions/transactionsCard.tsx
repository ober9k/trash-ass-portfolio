import AltCardHeader from "@/components/miscellaneous/altCardHeader";
import TransactionItem from "@/components/transactions/transactionItem";
import { Alert, Card, CardContent } from "@mui/material";
import type { Asset, Transaction } from "@shared/types/portfolio.ts";

type Props = {
  asset:        Asset,
  transactions: Transaction[] | null,
}

function TransactionsCard(props: Props) {
  const { asset, transactions } = props;

  const isTransactionsNull  = () => transactions === null; /* distinguish between not retrieved and empty */
  const isTransactionsEmpty = () => transactions && transactions.length === 0;

  return (<>
    <Card>
      <AltCardHeader title="Transactions" />
      <CardContent>
        {isTransactionsNull() || isTransactionsEmpty() ? (
        <section>
          {isTransactionsNull() && (
            <Alert severity="warning">
              Unable to load holding transactions.
            </Alert>
          )}
          {isTransactionsEmpty() && (
            <Alert severity="warning">
              There are no trasnsactions to show.<br />
            </Alert>
          )}
          </section>
        ) : (
          <section>
            {transactions && transactions.map((transaction, key) => (
              <TransactionItem asset={asset} transaction={transaction} key={key} />
            ))}
          </section>
        )}
      </CardContent>
    </Card>
    </>
  );
}

export default TransactionsCard;
