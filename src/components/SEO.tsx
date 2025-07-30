import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

export default function SEO({
  title = "Ternary Premium - AI-Powered Code Generation Platform",
  description = "Platform AI terdepan untuk pengembangan aplikasi yang lebih cepat, lebih cerdas, dan lebih efisien. Dapatkan akses ke model AI terbaru dengan fitur-fitur eksklusif.",
  keywords = "AI, code generation, development, ternary, premium, artificial intelligence, programming",
  image = "/og-image.png",
  url = "https://ternary-premium.com",
  type = "website",
}: SEOProps) {
  const fullTitle = title.includes("Ternary Premium")
    ? title
    : `${title} - Ternary Premium`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ternary Premium" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Ternary Premium" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#7c3aed" />
      <meta name="msapplication-TileColor" content="#7c3aed" />
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://accounts.google.com" />
    </Head>
  );
}
