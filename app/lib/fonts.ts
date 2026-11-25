import localFont from "next/font/local";

export const geistSans = localFont({
  src: "../../public/fonts/geist-sans.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
});

export const instrumentSerif = localFont({
  src: [
    {
      path: "../../public/fonts/instrument-serif.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/instrument-serif-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument",
  display: "swap",
});
