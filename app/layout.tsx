"use client";

import "@styles/globals.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import PreLoader from "@components/Common/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body>
        <div>
          {loading ? (
            <PreLoader />
          ) : (
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
              {children}
            </ThemeProvider>
          )}
        </div>
      </body>
    </html>
  );
}
