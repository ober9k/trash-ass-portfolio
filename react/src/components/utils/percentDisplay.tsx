type Props = {
  marketValue:   number,
  purchaseValue: number,
  precision?:    number,
};

function PercentDisplay(props: Props) {
  const { marketValue, purchaseValue, precision = 1 } = props;

  const gain = ((marketValue / purchaseValue) - 1) * 100;
  const gainClass = (gain > 0)
    ? "bg-green-200 text-green-600"
    : "bg-red-200 text-red-600";

  return (
    <>
      <span className={`mx-1 px-1 py-1 rounded ${gainClass}`}>
        {gain > 0 && "+"}
        {gain.toFixed(precision)}%
      </span>
    </>
  );
}

export default PercentDisplay;
