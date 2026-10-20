import type { TransactionCreateLoaderProps } from "@/api/loaders";
import { buildAddTransactionFn } from "@/api/mutationFunctions";
import NavigationBar from "@/components/layout/navigationBar.tsx";
import { Urls } from "@/config/urls.ts";
import { buildFormAction } from "@/forms/transactions/actions";
import { buildInitialState } from "@/forms/transactions/form.ts";
import BackButton from "@/pages/holdings/transactions/components/backButton";
import UpdateForm from "@/pages/holdings/transactions/forms/updateForm.tsx";
import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import { useActionState } from "react";

function TransactionCreatePage() {
  const { asset }: TransactionCreateLoaderProps = getRouteApi(Urls.TransactionCreate).useLoaderData();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const leftSlot = (<BackButton asset={asset} />);

  const mutation = useMutation({
    mutationFn: buildAddTransactionFn(asset.id),
    onSuccess: (data) => {
      router.navigate({ to: Urls.Holding, params: { holdingId: asset.id } });
      enqueueSnackbar("Transaction successfully saved.", { variant: "success", anchorOrigin: { vertical: "top", horizontal: "right" } });
      // console.log("success", data);
    },
    onError: (error) => {
      // console.error("error", error);
    }
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), buildInitialState());

  const onCancel = () => {
    router.navigate({ to: Urls.Holding, params: { holdingId: asset.id } });
  };

  return (
    <>
      <article className="h-full min-h-screen bg-[#121212] pb-1">
        <NavigationBar leftSlot={leftSlot}>
          <Typography variant="h4" component="h4" className="text-lg">
            Add Transaction
          </Typography>
        </NavigationBar>
        <article className="flex flex-col gap-4 p-2 m-2">
          <UpdateForm asset={asset} formState={formState} formAction={formAction} isPending={isPending} onCancel={onCancel} />
        </article>
      </article>
    </>
  );
}

export default TransactionCreatePage;
