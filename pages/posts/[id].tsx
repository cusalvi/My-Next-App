import { useRouter } from 'next/router';

export default function Post({ post }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Timestamp: {post.timestamp}</p>
    </div>
  );
}

// 
// export async function getServerSideProps({ params }) {
//   const { id } = params;
//   const res = await fetch(`http://localhost:3000/api/posts/${id}`);
//   const post = await res.json();

//   return {
//     props: {
//       post,
//     },
//   };
// }

export async function getStaticPaths() {
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }, { params: { id: '4' } }, { params: { id: '5' } }];
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  console.log({"NEXT_PUBLIC_HOSTED_URL" : process.env.NEXT_PUBLIC_HOSTED_URL})
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTED_URL}/api/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
    revalidate: 10, // Regenerate page after 10 seconds
  };
}