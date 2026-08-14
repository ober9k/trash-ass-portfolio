import { transactions } from "@/data/mock/transactions.ts";

type TokenProps = {
  symbol: string,
  quantity: number,
}

function Token(props: TokenProps) {
  return (
    <>
      <article className="my-2 p-2 border border-gray-200 bg-gray-50">
        <h1 className="text-md font-medium">
          {props.symbol.toUpperCase()}
          <div className="float-right">
            $0.00
          </div>
        </h1>
        <p className="text-sm">
          {props.quantity} | $0.00
        </p>
      </article>
    </>
  );
}

function Portfolio() {
  const tokens = transactions.reduce((acc, cur) => {
    let token = acc.find((x) => x.symbol === cur.symbol);

    if (token) {
      token.quantity += cur.quantity;
    }
    else {
      acc.push({ ...cur });
    }

    return acc;
  }, []);

  return (
    <>
      <h1 className="text-xl">
        Portfolio.
      </h1>
      <ul>
        {tokens.map((token) => (
          <li key={token.symbol}>
            <Token symbol={token.symbol} quantity={token.quantity} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Portfolio;
