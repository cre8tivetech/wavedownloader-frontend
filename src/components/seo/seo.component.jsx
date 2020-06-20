import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, lang }) => {
  const metaDescription = "An online post and video downloader | Download Instagram posts, YouTube videos and more";
  const siteTitle = "WaveDownloader";
  const author = "@wavedownloader";

  return (
    <Helmet
      title={title}
      titleTemplate={`${siteTitle} | %s`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]}
    />
  );
};

export default SEO;
