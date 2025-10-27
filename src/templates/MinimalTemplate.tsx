"use client";

import { ReactNode } from 'react';

export default function MinimalTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="minimal-template">
      <style jsx global>{`
        .minimal-template {
          --primary: 0 0% 20%;
          --primary-foreground: 0 0% 100%;
        }

        .minimal-template {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .minimal-template h1, .minimal-template h2, .minimal-template h3 {
          font-weight: 300;
          letter-spacing: -0.02em;
          color: hsl(0, 0%, 20%);
        }

        .minimal-template .card {
          border: 1px solid hsl(0, 0%, 85%);
          box-shadow: none;
          border-radius: 2px;
        }

        .minimal-template .button {
          border-radius: 0;
          border: 1px solid currentColor;
          background: transparent;
        }

        .minimal-template .button:hover {
          background: hsl(0, 0%, 20%);
          color: white;
        }
      `}</style>
      {children}
    </div>
  );
}
