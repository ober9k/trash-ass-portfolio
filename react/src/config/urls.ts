export const Urls = {
  // standard pages
  Portfolio:   "/",
  Holding:     "/holdings/$holdingId", /* working off `ticker` for now */
  TransactionCreate: "/holdings/$holdingId/transactions/create",
  TransactionUpdate: "/holdings/$holdingId/transactions/$transactionId/update",
  // auth related pages
  AuthProfile: "/auth/profile",
  AuthSignIn:  "/auth/sign-in",
  AuthSignOut: "/auth/sign-out",
} as const;
