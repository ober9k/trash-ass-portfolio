import { CardHeader } from "@mui/material";

type Props = {
  title: string;
};

function AltCardHeader(props: Props) {
  const { title } = props;

  const slotProps = {
    title: {
      variant:   "h6" as const,
      className: "text-sm uppercase",
    },
  };

  return (
    <CardHeader title={title} slotProps={slotProps} className="pb-0" />
  );
}

export default AltCardHeader;
