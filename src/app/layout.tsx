import {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Power jolt Transformer",
    description: "Light weight transformer for enterprise application",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <Head>

            <meta name="google-adsense-account" content="ca-pub-5750827820025211"></meta>
            <meta name="google-site-verification" content="IPyRRhgxWhjZzmgkPLHZwZ6wc3RIx4L8AB0fNHwYPzE"></meta>


            {/* Google Analytics */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-P647K6M805"></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-P647K6M805');
            `,
                }}
            />

            {/* Google Ads */}
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-5750827820025211",
                enable_page_level_ads: true
              });
            `,
                }}
            />
        </Head>
        <body className={inter.className}>{children}</body>
        </html>
    );
}
