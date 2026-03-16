import "./styles/globals.css";
import SystemWrapper from "./SystemWrapper";

export const metadata = {
  title: "PortfolioOS",
  description: "Interactive Portfolio System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SystemWrapper>
          {children}
        </SystemWrapper>
      </body>
    </html>
  );
}