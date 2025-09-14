import { Head, Html, Main, NextScript } from "next/document";
import { LoadingProvider } from "../providers/LoadingProvider";

export default function Document() {
  return (
    <Html lang="en">
      <LoadingProvider>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </LoadingProvider>
    </Html>
  );
}
