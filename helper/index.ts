import { addEditableTags } from "@contentstack/utils";
// import { Page, BlogPosts } from "../typescript/pages";
import getConfig from "next/config";
// import { FooterProps, HeaderProps } from "../typescript/layout";
import { getEntry, getEntryByUrl } from "../contentstack-sdk";

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getAllEntries = async () => {
  const response = (await getEntry({
    contentTypeUid: "content",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  }));
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "content", true));
  return response[0];
};

export const getPageRes = async (entryUrl: string) => {
  console.log({entryUrl})
    const response = (await getEntryByUrl({
      contentTypeUid: "content",
      entryUrl,
      referenceFieldPath: undefined,
      jsonRtePath: ["json_rte"],
      // referenceFieldPath: ["page_components.from_blog.featured_blogs"],
      // jsonRtePath: [
      //   "page_components.from_blog.featured_blogs.body",
      //   "page_components.section_with_buckets.buckets.description",
      //   "page_components.section_with_html_code.description",
      // ],
    }));
    liveEdit && addEditableTags(response[0], "content", true);
    return response[0];
};