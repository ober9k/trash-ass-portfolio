import type { TransactionAddLoaderProps } from "@/api/loaders";
import { buildAddTransactionFn } from "@/api/mutationFunctions";
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

function TransactionAddPage() {
  const { asset }: TransactionAddLoaderProps = getRouteApi(Urls.TransactionAdd).useLoaderData();
  const router = useRouter();

  const leftSlot = (
    <IconButton size="large" color="inherit" edge="start" aria-label="go back">
      <Link to={Urls.Holding} params={{ holdingId: asset.id }}>
        <ArrowLeft />
      </Link>
    </IconButton>
  );

  const mutation = useMutation({
    mutationFn: buildAddTransactionFn(asset.ticker),
    onSuccess: (data) => {
      console.log("success", data);
    },
    onError: (error) => {
      console.error("error", error);
    }
  });

  const [ formState, formAction, isPending ] = useActionState(buildFormAction(mutation), buildInitialState());

  const onCancel = () => {
    router.navigate({ to: Urls.Holding, params: { holdingId: asset.id } });
  };

  return (
    <>
      <article style={{ backgroundColor: "#121212" }} className="h-dvh">
        <NavigationBar leftSlot={leftSlot}>
          <Typography variant="h4" component="h4" className="text-lg">
            Add Transaction
          </Typography>
        </NavigationBar>
        <article className="flex flex-col gap-4 p-2 m-2">
          <UpdateForm formState={formState} formAction={formAction} isPending={isPending} onCancel={onCancel} />
        </article>
      </article>
    </>
  );
}

export default TransactionAddPage;
