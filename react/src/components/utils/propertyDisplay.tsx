import type { ReactNode } from "react";

type Props = {
  title:    string,
  children: ReactNode,
};

function PropertyDisplay(props: Props) {
  const { title, children } = props;

  return (
    <>
      <div className={"grow"}>
        <h3 className={"py-1 text-xs text-center text-gray-600 font-medium uppercase"}>
          {title}
        </h3>
        <h4 className={"text-center text-sm font-bold"}>
          {children}
        </h4>
      </div>
    </>
  );
}

export default PropertyDisplay;
