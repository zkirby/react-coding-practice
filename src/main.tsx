import ReactDOM from "react-dom/client";
import StockPortfolio from "./questions/StockPortfolio/Solution";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // -----------------------------------------
  // ------ TEST SOLUTIONS HERE --------------
  // -----------------------------------------
  <StockPortfolio
    stocks={[
      { ticker: "APPLE", total: 10, color: "red" },
      { ticker: "META", total: 24, color: "blue" },
      { ticker: "GOOGLE", total: 3, color: "green" },
      { ticker: "MSOFT", total: 12, color: "orange" },
    ]}
  />
);
