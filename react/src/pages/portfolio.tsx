import PortfolioTotal from "@/components/portfolio/portfolioTotal.tsx";

function Portfolio() {
  const totalWorth = {
    total:       10126.00,
    currency:    "AUD",
    gain:        125.00,
    gainPercent: 1.25,
  };

  return (
    <>
      <h1>Portfolio</h1>
      <PortfolioTotal {...totalWorth} />
    </>
  );
}

export default Portfolio;
