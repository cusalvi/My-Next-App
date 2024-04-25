import { handler } from "./api/route"

export default function Product({ result }) {
    return(
      <>
        <h1>Product</h1>
        <div>Product ID: {result.id}</div>
        <div>Brand: {result.brand}</div>
        <div>Equipment: {result.equipment}</div>
        <div>Random Number: {result.randomNum}</div>
      </>
    )
}

export async function getServerSideProps() {
  const result = await handler(`https://random-data-api.com/api/v2/appliances`)
  const num = Math.random();
  result.randomNum = num;
  return {
    props: {
      result
    }
  }
}