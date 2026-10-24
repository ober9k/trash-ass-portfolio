export const Urls = {
  // standard pages
  Portfolio:   "/",
  About:       "/about",
  Holding:     "/holdings/$holdingId", /* working off `ticker` for now */
  TransactionCreate: "/transactions/create",
  TransactionUpdate: "/transactions/$transactionId/update",
  // auth related pages
  AuthProfile: "/auth/profile",
  AuthSignIn:  "/auth/sign-in",
  AuthSignOut: "/auth/sign-out",
} as const;
