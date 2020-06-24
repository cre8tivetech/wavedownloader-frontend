import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, lang }) => {
  const metaDescription = "Free online post and video downloader to download Instagram posts, YouTube videos, Twitter videos and Gifs, Facebook videos, SoundCloud audios and more. Mention @getWdBot in a video or gif tweet to get download links of a tweet video or gif.";
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
