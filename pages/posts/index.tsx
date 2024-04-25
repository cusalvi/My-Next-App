// import { useRouter } from 'next/router';

export default function Posts({posts}) {
  // const router = useRouter();
  console.log(posts.length, posts[0])
  {
    posts?.map(({userId, id, title, body}) => {
      return (
          <p>test</p>
        )
    })
  }

  return (
    <p>No posts from posts/index</p>
  )
}


export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTED_URL}/api/posts`);
    const posts = await res.json();
    // console.log({posts})

    return {
      props: {
        posts,
      }
    };
}