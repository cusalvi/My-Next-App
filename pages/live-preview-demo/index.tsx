// import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Contentstack from 'contentstack'
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { onEntryChange } from "../../contentstack-sdk"
import { getAllEntries, getPageRes } from "../../helper"

// export default function LivePreviewEntry({ entry }) {
//   // const router = useRouter();
//   // const { id } = router.query;

//   return (
//     <div>
//       <h1>{entry.title}</h1>
//       <p>{entry.multi_line}</p>
//     </div>
//   );
// }

export default function LivePreviewEntry({page, pageUrl}) {
  const [getEntry, setEntry] = useState(page);
  // const [getList] = useState({ archive: archivePost, list: post });
  // const router = useRouter();
  // const { id } = router.query;

  async function fetchData() {
    try {
      console.info('fetching live preview data...', {page}, {pageUrl});
      const bannerRes = await getPageRes(pageUrl);
      setEntry(bannerRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [page]);

  return (
    <>
      <div>
        <h1>{page.title}</h1>
        <p>{page.multi_line}</p>
        {/* <p>RTE: {page.rich_text_editor}</p> */}
      </div>
    </>
  );
}


export async function getServerSideProps(context) {
  try {
    const page = await getPageRes('/live-preview-demo');
    if (!page) throw new Error('404');

    return {
      props: {
        pageUrl: context.resolvedUrl,
        page,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}