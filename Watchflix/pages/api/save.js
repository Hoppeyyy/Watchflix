import { Save, Read } from "@/utils/helpers";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { uuid, item } = req.body;
    console.log(uuid, item);
    await Save(uuid, item);
    res.status(200).json({ name: "John Doe" });
  }

  if (req.method === "GET") {
    const { uuid } = req.query;
    console.log(uuid);
    try {
      const favs = await import(`@/saves/${uuid}.json`);
      // console.log(favs.default)
      res.status(200).json(favs.default);
    } catch (e) {
      res.status(200).json(false);
    }
  }
}
