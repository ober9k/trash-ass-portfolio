export const Urls = {
  // standard pages
  Portfolio:   "/",
  Holding:     "/holdings/$holdingId", /* working off `ticker` for now */
  TransactionAdd:    "/holdings/$holdingId/transactions/add",
  TransactionUpdate: "/holdings/$holdingId/transactions/$transactionId/update",
  // auth related pages
  AuthSignIn:  "/auth/sign-in",
} as const;
