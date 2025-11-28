"use client";

import React from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import { PageHeading } from "@/components/shared/PageHeading";
import { TermsPrivacyContent } from "@/components/shared/TermsPrivacyContent";

export default function TermsPage() {
  const { langI18n, staticContentData } = usePortfolio();

  return (
    <>
      <PageHeading
        title={langI18n.terms}
        subTitle={staticContentData.terms.subtitle}
      />
      <TermsPrivacyContent
        lastUpdatedTranslate={langI18n.lastUpdated}
        termsPrivacy={staticContentData.terms}
      />
    </>
  );
}
