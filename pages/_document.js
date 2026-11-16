import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Open the connection to the cocktail API early so the first request is quicker */}
        <link rel="preconnect" href="https://www.thecocktaildb.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
