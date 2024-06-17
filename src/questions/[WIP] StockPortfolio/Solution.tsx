import { useCallback, useState } from "react";
import "./solution.css";

const cns = (...names: (string | boolean)[]) => names.filter(Boolean).join(" ");

interface Stock {
  ticker: string;
  total: number;
  color: string;
}

interface StockPortfolioProps {
  stocks: Stock[];
}

const formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** In pixels */
const PIE_CHART_SIZE = 400;

/** Shows a pie chart and breakdown of each stock in your portfolio */
export default function StockPortfolio({ stocks }: StockPortfolioProps) {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const total = stocks.reduce((t, n) => t + n.total, 0);

  const setSelected = useCallback(
    (ticker: string) => setSelectedStock(ticker),
    []
  );

  return (
    <div className="sp__wrapper">
      <PieChart
        stocks={stocks}
        selected={selectedStock}
        onSelect={setSelected}
        total={total}
      />
      <StockBreakdown
        stocks={stocks}
        selected={selectedStock}
        onSelect={setSelected}
        total={total}
      />

      {/* Total stock */}
      <h3>Deposit Amount: {formatter.format(total)}</h3>
    </div>
  );
}

interface StockPortfolioChildProps {
  stocks: Stock[];
  selected: string | null;
  onSelect: (ticker: string) => void;
  total: number;
}

/** Pie chart derived from `stocks` */
function PieChart({
  stocks,
  selected,
  onSelect,
  total,
}: StockPortfolioChildProps) {
  return (
    <div className="sp__pie-chart" style={{ width: `${PIE_CHART_SIZE}px` }}>
      {stocks.map((s: Stock) => {
        const percent = s.total / total;
        return (
          <button
            className={cns(
              "sp__pie-chart__stock",
              selected === s.ticker && "selected"
            )}
            style={{
              width: `${percent * PIE_CHART_SIZE}px`,
              backgroundColor: s.color,
            }}
            onClick={() => onSelect(s.ticker)}
          >
            {s.ticker}
          </button>
        );
      })}
    </div>
  );
}

/** Breakdown of stocks */
function StockBreakdown({
  stocks,
  selected,
  onSelect,
  total,
}: StockPortfolioChildProps) {
  return (
    <div className="sp__breakdown">
      {stocks.map((s) => {
        const percent = s.total / total;
        return (
          <button
            className={cns(
              "sp__breakdown__stock",
              selected === s.ticker && "selected"
            )}
            onClick={() => onSelect(s.ticker)}
          >
            <div>{s.ticker}</div>
            <div style={{ width: "100%" }}>
              <div
                style={{
                  width: `${percent * PIE_CHART_SIZE}px`,
                  backgroundColor: s.color,
                  height: "20px",
                }}
              />
            </div>
            <div>
              <div>{Math.round(percent * 100)}%</div>
              <div>{formatter.format(s.total)}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
