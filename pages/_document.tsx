import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://cdn.syncfusion.com/ej2/25.1.35/tailwind.css" rel="stylesheet" />
      </Head>
      <body style={{ overflowY: 'hidden' }} suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
