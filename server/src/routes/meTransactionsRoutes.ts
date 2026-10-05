import { fetchTransactionById, updateTransactionById } from "@/apis/transactions";
import { transactionIdValidationHandler } from "@/middlewares/validators/idValidators";
import { transactionSchemaValidationHandler } from "@/middlewares/validators/schemaValidators";
import { Router, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";

const router = Router();

// router.use(isAuthenticated);

/**
 * List all of current user's transactions by tokenId.
 */
router.get("/:transactionId", [transactionIdValidationHandler()], async (req: Request, res: Response) => {
  const transactionId = req.params["transactionId"] as string;

  return res.status(StatusCodes.OK).json(
    await fetchTransactionById(transactionId),
  );
});

/**
 * List all of current user's transactions by tokenId.
 */
router.put("/:transactionId", [transactionIdValidationHandler(), transactionSchemaValidationHandler()], async (req: Request, res: Response) => {
  const transactionId = req.params["transactionId"] as string;
  const { price, quantity, fee, value } = req.body;

  return res.status(StatusCodes.OK).json(
    await updateTransactionById(transactionId, { price, quantity, fee, value }),
  );
});

export { router as meTransactionsRoutes };
