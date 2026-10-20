import { Button } from "@mui/material";

type CancelButtonProps = {
  disabled?: boolean,
  onClick?:  () => void,
}

function CancelButton(props: CancelButtonProps) {
  const { disabled = false, onClick = () => {} } = props;

  return (<>
    <Button type="button" disabled={disabled} onClick={onClick} size="small" variant="outlined">Cancel</Button>
  </>);
}

type CreateButtonProps = {
  disabled?: boolean,
}

function CreateButton(props: CreateButtonProps) {
  const { disabled = false } = props;

  return (<>
    <Button type="submit" disabled={disabled} size="small" variant="contained">Create</Button>
  </>);
}

type UpdateButtonProps = {
  disabled?: boolean,
}

function UpdateButton(props: UpdateButtonProps) {
  const { disabled = false } = props;

  return (<>
    <Button type="submit" disabled={disabled} size="small" variant="contained">Update</Button>
  </>);
}

export { CancelButton, CreateButton, UpdateButton };

