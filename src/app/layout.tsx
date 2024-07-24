import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/app/components/Header';
import Script from 'next/script';
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Power Jolt Transformer",
    description: "Light weight transformer for enterprise application",
    keywords: "Java JSON transformer, JSON to JSON transformation Java, Power Jolt Java JSON, JSON transformation tool, Java JSON mapping, Power Jolt JSON transformer, JSON transformation library Java, Java JSON processing, Power Jolt JSON solutions, JSON transformation framework Java, AI-generated Jolt spec tool, AI Jolt spec generator, Automated Jolt spec generation, AI-powered JSON processing Java, JSON transformation AI Java tool, Java JSON mapping with AI, Power Jolt AI JSON solutions, AI Jolt transformer, AI JSON transformation, Java AI JSON tool, Enterprise JSON transformer, AI Java JSON library, JSON mapping automation, AI-based JSON transformation, JSON transformation API Java, AI for JSON processing"
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
        </Head>
        <body className={inter.className}>
        <Header />
        {children}
        <footer className="bg-blue-600 text-white p-2 text-center text-[10px]">
            © {new Date().getFullYear()} Magnasha. All rights reserved.
        </footer>

        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-P647K6M805" />
        <Script
            id="google-analytics"
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
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
        <Script
            id="google-ads"
            dangerouslySetInnerHTML={{
                __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-5750827820025211",
                enable_page_level_ads: true
              });
            `,
            }}
        />
        </body>
        </html>
    );
}
