export const Urls = {
  // standard pages
  Portfolio:   "/",
  Holding:     "/holdings/$holdingId", /* working off `ticker` for now */
  Transaction: "/holdings/$holdingId/transactions/$transactionId",
  // auth related pages
  AuthSignIn:  "/auth/sign-in",
} as const;
