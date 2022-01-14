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
    case "GET":
      await sleep(5000).then(() => {
        res.status(200).json({ "hello": "5000" });
      })
      break;
    case "POST":
      const retorno = { "navegador": req.body }
      await sleep(5000).then(() => {
        res.status(200).json(retorno);
      })
      console.log('chamouuuuu', retorno)
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
