import { useRouter } from 'next/router';
import { useState } from 'react';

export default function PostCDN({ post }) {
  const router = useRouter();
  const { id } = router.query;
  const [timestamp, setTimestamp] = useState(post.timestamp);

  const handleRefresh = async () => {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`);
    const updatedPost = await res.json();
    setTimestamp(updatedPost.timestamp);
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Timestamp: {timestamp}</p>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

export async function getStaticPaths() {
  // Define the paths for pre-rendering during build time
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }, { params: { id: '4' } }, { params: { id: '5' } }];
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTED_URL}/api/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
    revalidate: 40, // Cache for 40 seconds
  };
}