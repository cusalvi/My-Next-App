import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
// import Contentstack from 'contentstack'
// import ContentstackLivePreview from "@contentstack/live-preview-utils";

export default function Home({ results }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Next App</title>
        <meta name="description" content="Generated manually" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/shuffle-products">Random Product</Link>

      <main className={styles.main}>
        <h1 className={styles.movieTitle}>
            Tom & Jerry
        </h1>
        <div>
            <Image src="/tom_and_jerry.jpeg" alt="tom_and_jerry" width={100} height={100} />
        </div> 
        <div>
          <h1>Top Movies</h1>
        </div>
            <ul>
            {results.map(result => {
                return(<li key={result.Title}> {result.Title} 
                  <div>
                  {(result.Poster) ? <Image src={result.Poster} alt={result.Title} width={300} height={200}/>:<Image src="/not-found.gif" alt={`Poster Not Available`} width={300} height={200}/>}
                  </div>
                </li>)
            })}
            </ul>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  // console.log({"process": process.env})
  // const Stack = Contentstack.Stack({ 
  //   "api_key": process.env.CONTENTSTACK_API_KEY, 
  //   "delivery_token": process.env.CONTENTSTACK_DELIVERY_TOKEN, 
  //   "environment": process.env.CONTENTSTACK_ENVIRONMENT 
  // });
  // ContentstackLivePreview.init({
  //   stackDetails: {
  //       apiKey: process.env.CONTENTSTACK_API_KEY
  //   },
  // });
  const URL = `https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies`
  const response = await fetch(URL)
  const data = await response.json()
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      results : data
    }
  }
}