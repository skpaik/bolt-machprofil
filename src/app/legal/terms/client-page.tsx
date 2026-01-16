"use client";

import React from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import { PageHeading } from "@/components/shared/PageHeading";
import { TermsPrivacyContent } from "@/components/shared/TermsPrivacyContent";

export default function ClientPage() {
  const { langI18n, contentData } = usePortfolio();

  const staticContentData = contentData.static_contents;

  return (
      <>
        <PageHeading
            title={langI18n.terms}
            subTitle={staticContentData.terms.subtitle}
        />
        <TermsPrivacyContent
            lastUpdatedTranslate={langI18n.last_updated}
            termsPrivacy={staticContentData.terms}
        />
      </>
  );
}
