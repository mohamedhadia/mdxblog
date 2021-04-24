import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "reflexjs";
import theme from "../src/theme";
import "./../src/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
