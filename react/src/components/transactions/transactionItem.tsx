import AssetIcon from "@/components/assets/assetIcon";
import AssetDisplay from "@/components/utils/assetDisplay.tsx";
import CurrencyDisplay from "@/components/utils/currencyDisplay.tsx";
import { formatDate } from "@/utils/numberUtils";
import { Box, Divider, Typography } from "@mui/material";
import type { Asset, Transaction } from "@shared/types/portfolio.ts";
import { Link } from "@tanstack/react-router";

type Props = {
  asset:       Asset
  transaction: Transaction,
};

function TransactionItem(props: Props) {
  const { asset, transaction } = props;

  return (
    <>
      <Box className="flex gap-3 p-1 mb-1 pb-3">
        <Box component="section" className="s-8">
          <AssetIcon asset={asset} />
        </Box>
        <Box component="section" className="grow">
          <Typography variant="h4" component="h4" className="pb-2 text-xl">
            <Link to="/transactions/x/$transactionId" params={{ transactionId: transaction.id }}>
              BUY
            </Link>
          </Typography>
          <Typography variant="h6" component="h6" className="text-sm">
            <CurrencyDisplay currentValue={transaction.price} /> @ <AssetDisplay asset={asset} quantity={transaction.quantity} />
          </Typography>
        </Box>
        <Box component="section" className="text-right">
          <Typography variant="h4" component="h4" className="pb-2 text-xl">
            <CurrencyDisplay currentValue={transaction.initialValue ?? transaction.value} />
          </Typography>
          <Typography variant="h6" component="h6" className="text-sm">
            {formatDate(new Date(transaction.purchasedAt))}
          </Typography>
        </Box>
      </Box>
      <Divider className="mb-3" />
    </>
  );
}

export default TransactionItem;
