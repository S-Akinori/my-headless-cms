// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getContent } from 'lib/fetchAPI';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Content } from 'src/types/Content'

type Data = {
  content: Content
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {id} = req.query;
  if(process.env.NEXT_PUBLIC_DOMAIN_ID && id && !Array.isArray(id)) {
    const content = await getContent(process.env.NEXT_PUBLIC_DOMAIN_ID, id);
    res.status(200).json({ content: content })
  } else {
    return res.status(400).json({ error: { messsage: "クエリが不正です" } });
  }
}
