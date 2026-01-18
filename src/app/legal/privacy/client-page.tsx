"use client";

import React from "react";
import {usePortfolio} from "@/components/context/PortfolioContext";
import {PageHeading} from "@/components/shared/PageHeading";
import {TermsPrivacyContent} from "@/components/shared/TermsPrivacyContent";
import {useContentLoader} from "@/components/hooks/use-content-loader";
import {emptyStaticContent} from "@/data/configs/constants/empty.data";
import {StaticContentData} from "@/lib/types/portfolio";

export default function ClientPage() {
    const {langI18n, profileType, languageType} = usePortfolio();

    const {data: staticContentData, loading, error} = useContentLoader<StaticContentData>(
        profileType,
        languageType,
        "static_contents",
        emptyStaticContent
    );

    return (
        <>
            <PageHeading
                title={langI18n.privacy}
                subTitle={staticContentData.privacy.subtitle}
            />
            <TermsPrivacyContent
                lastUpdatedTranslate={langI18n.last_updated}
                termsPrivacy={staticContentData.privacy}
            />
        </>
    );
}
