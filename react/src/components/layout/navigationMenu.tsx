import type { ReactNode } from "react";

type Props = {
  leftItem?:  ReactNode,
  children:   ReactNode,
  rightItem?: ReactNode,
}

function NavigationMenu(props: Props) {
  const { leftItem = "", children, rightItem = "" } = props;

  return (
    <>
      <nav className={"flex gap-2 p-1 bg-gray-200 border-b border-gray-300"}>
        <div className={"p-2.5 text-md min-w-10"}>
          {leftItem}
        </div>
        <div className={"flex-grow py-2 px-4 font-medium"}>
          <h1 className={"flex justify-center items-center gap-2"}>
            {children}
          </h1>
        </div>
        <div className={"p-2.5 text-md min-w-10"}>
          {rightItem}
        </div>
      </nav>
    </>
  );
}

export default NavigationMenu;
