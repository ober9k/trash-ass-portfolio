import type { TransactionUpdateLoaderProps } from "@/api/loaders";
import { buildUpdateTransactionFn } from "@/api/mutationFunctions";
import NavigationTitle from "@/components/layout/navigation/navigationTitle.tsx";
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

function UpdatePage() {
  const { asset, transaction }: TransactionUpdateLoaderProps = getRouteApi(Urls.TransactionUpdate).useLoaderData();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const leftSlot = (<BackButton asset={asset} />);

  const mutation = useMutation({
    mutationFn: buildUpdateTransactionFn(asset.id, transaction.id),
    onSuccess: (data) => {
      router.navigate({ to: Urls.Holding, params: { holdingId: asset.id } });
      enqueueSnackbar("Transaction successfully updated.", { variant: "success", anchorOrigin: { vertical: "top", horizontal: "right" } });
      // console.log("success", data);
    },
    onError: (error) => {
      // console.error("error", error);
    }
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), buildInitialState(transaction));

  const onCancel = () => {
    router.navigate({ to: Urls.Holding, params: { holdingId: asset.id } });
  };

  return (
    <>
      <article className="h-full min-h-screen bg-[#121212] pb-1">
        <NavigationBar leftSlot={leftSlot}>
          <NavigationTitle>Update Transaction</NavigationTitle>
        </NavigationBar>
        <article className="flex flex-col gap-4 p-2 m-2">
          <UpdateForm asset={asset} formState={formState} formAction={formAction} isPending={isPending} onCancel={onCancel} />
        </article>
      </article>
    </>
  );
}

export default UpdatePage;
