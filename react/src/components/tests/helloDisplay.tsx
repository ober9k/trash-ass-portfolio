type Props = {
  name?:  string,
};

function HelloDisplay(props) {
  const { name = "World" } = props;

  return (
    <>
      <h1 data-testid="greeting">Hello, {name}!</h1>
    </>
  );
}

export default HelloDisplay;
