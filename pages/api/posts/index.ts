import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  post?: object,
  error?: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const posts = await response.json();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all posts' });
  }
}