import Item from "../models/items.model";
import express, { NextFunction, Request, Response } from "express";
import { fetchUpcData } from "../services/upcitemdb";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const result = await Item.find().limit(100);
  res.status(200).send({ data: result });
});

router.get("/:upc", async (req: Request, res: Response, next: NextFunction) => {
  const { upc } = req.params;

  try {
    const result = await Item.findOne({ upc: upc });

    if (!result) {
      res
        .status(404)
        .send({ message: `Product Not Found for UPC Code ${upc}` });
    }

    res.status(200).send({ data: result });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post(
  "/:code",
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.params;
    try {
      const upciteResponse = await fetchUpcData(code);

      if (upciteResponse instanceof Error) {
        res.status(500).send({ upciteResponse });
      }

      const { upc, ...restUpcData } = upciteResponse;

      const result = await Item.updateOne(
        { upc: code },
        { upc, ...restUpcData },
        { upsert: true }
      );
      res
        .status(201)
        .send({
          data: {
            productUpserted: result.upsertedId,
            ...restUpcData,
        }})
    } catch (error) {
      res.status(500).send({ error });
    }
  }
);

export default router;
