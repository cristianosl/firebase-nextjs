import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  switch (method) {
    case "POST":
      const retorno = { "data": JSON.parse(req.body) }
      await sleep(1000).then(() => {
        res.status(200).json(retorno);
      })
      console.log('chamouuuuu', retorno)
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
