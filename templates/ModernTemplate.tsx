"use client";

import { ReactNode } from 'react';

export default function ModernTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="modern-template">
      <style jsx global>{`
        .modern-template {
          --primary: 220 90% 56%;
          --primary-foreground: 0 0% 100%;
        }

        .modern-template .bg-gradient {
          background: linear-gradient(135deg, hsl(220, 90%, 56%) 0%, hsl(260, 90%, 60%) 100%);
        }

        .modern-template h1, .modern-template h2 {
          background: linear-gradient(135deg, hsl(220, 90%, 56%), hsl(260, 90%, 60%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
      {children}
    </div>
  );
}
