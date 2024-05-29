interface DefaultLinksProps {
  origin?: string;
}

export default function DefaultLinks({ origin }: DefaultLinksProps) {
  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      {origin && <link rel="canonical" href={origin} />}
      <link
        rel="search"
        href="/opensearch.xml"
        type="application/opensearchdescription+xml"
        title="Hashnode"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/logo_180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/logo_32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/logo_16x16.png"
      />
      <link
        rel="mask-icon"
        href="/images/safari-pinned-tab-new.svg"
        color="#2962ff"
      />
      <link
        rel="preload"
        href="/fonts/SuisseIntl-Book-WebXL.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/SuisseIntl-Medium-WebXL.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/SuisseIntl-SemiBold-WebXL.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/SuisseIntl-Bold-WebXL.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
}
