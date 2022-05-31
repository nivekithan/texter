import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "~/styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Texter",
  viewport: "width=device-width,initial-scale=1",
});

// <link rel="preconnect" href="https://fonts.googleapis.com">
//<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&display=swap" rel="stylesheet">

export const links = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: true },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/logo.png",
    },
  ];
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body
        className="h-full text-white font-sans "
        style={{ backgroundColor: "hsl(0,0%,0%)" }}
      >
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
