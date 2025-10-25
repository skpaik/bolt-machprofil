"use client";

import { ReactNode } from 'react';

export default function ClassicTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="classic-template">
      <style jsx global>{`
        .classic-template {
          --primary: 25 95% 53%;
          --primary-foreground: 0 0% 100%;
          font-family: Georgia, 'Times New Roman', serif;
        }

        .classic-template h1, .classic-template h2, .classic-template h3 {
          font-family: Georgia, 'Times New Roman', serif;
          color: hsl(25, 95%, 40%);
        }

        .classic-template .card {
          border: 2px solid hsl(25, 95%, 53%);
          box-shadow: 4px 4px 0 hsl(25, 95%, 90%);
        }

        .classic-template .button {
          border-radius: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}</style>
      {children}
    </div>
  );
}
