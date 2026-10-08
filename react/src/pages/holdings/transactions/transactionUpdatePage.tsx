import type { TransactionUpdateLoaderProps } from "@/api/loaders";
import { buildUpdateTransactionFn } from "@/api/mutationFunctions";
import NavigationBar from "@/components/layout/navigationBar.tsx";
import { Urls } from "@/config/urls.ts";
import { buildFormAction } from "@/forms/transactions/actions";
import { buildInitialState } from "@/forms/transactions/form.ts";
import UpdateForm from "@/pages/holdings/transactions/forms/updateForm.tsx";
import { IconButton, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useActionState } from "react";

function TransactionUpdatePage() {
  const { asset, transaction }: TransactionUpdateLoaderProps = getRouteApi(Urls.TransactionUpdate).useLoaderData();
  const router = useRouter();

  const leftSlot = (
    <IconButton size="large" color="inherit" edge="start" aria-label="go back">
      <Link to={Urls.Holding} params={{ holdingId: asset.id }}>
        <ArrowLeft />
      </Link>
    </IconButton>
  );

  const mutation = useMutation({
    mutationFn: buildUpdateTransactionFn(transaction.id),
    onSuccess: (data) => {
      console.log("success", data);
    },
    onError: (error) => {
      console.error("error", error);
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
          <Typography variant="h4" component="h4" className="text-lg">
            Update Transaction
          </Typography>
        </NavigationBar>
        <article className="flex flex-col gap-4 p-2 m-2">
          <UpdateForm formState={formState} formAction={formAction} isPending={isPending} onCancel={onCancel} />
        </article>
      </article>
    </>
  );
}

export default TransactionUpdatePage;
