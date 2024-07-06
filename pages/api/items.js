// pages/api/items.js
import { mongooseConnect } from "@/lib/mongoose";
import { Items } from "@/model/items";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === 'GET') {
    const items = await Items.find();
    res.json(items);
  }

  if (method === 'POST') {
    const { text, image, desc, tags } = req.body;
    const item = await Items.create({ text, image, desc, tags });
    res.json(item);
  }

  if (method === 'PUT') {
    const { id, newItem } = req.body;
    await Items.updateOne({ _id: id }, newItem);
    res.json(newItem);
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    if (_id) {
      await Items.deleteOne({ _id });
    } else {
      await Items.deleteMany();
    }
    res.json({ message: 'Deleted' });
  }

  if (method === 'CHECK_STORAGE') {
    const dbStats = await Items.db.db.stats(); // Get DB stats
    const storageSize = dbStats.storageSize / (1024 * 1024); // Convert to MB

    if (storageSize >= 490) {
      await Items.deleteMany();
      return res.json({ message: 'Storage limit exceeded. All items deleted.' });
    }
    res.json({ message: 'Storage size within limit.', storageSize });
  }
}
