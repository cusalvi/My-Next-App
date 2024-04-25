// export default async function GET(req, res) {
//     const { id } = req.query;
  
//     try {
//       const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
//       const post = await response.json();
  
//       // Add the timestamp field to the post object
//       post.timestamp = new Date().toISOString();
  
//       res.status(200).json(post);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch post data' });
//     }
// }

import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  post?: object,
  error?: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  
  const { id } = req.query;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const post = await response.json();
      // Add the timestamp field to the post object
      post.timestamp = new Date().toISOString();
      console.log({post})
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch post data' });
    }
}

