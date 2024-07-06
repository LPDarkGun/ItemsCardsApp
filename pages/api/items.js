import { mongooseConnect } from "@/lib/mongoose";
import { Items } from "@/model/items";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  const io = res.socket.server.io;  // Access the Socket.IO server instance

  if (!io) {
    console.error('Socket.io not initialized');
    res.status(500).send('Socket.io not initialized');
    return;
  }

  if (method === 'GET') {
    const items = await Items.find();
    res.json(items);
  }

  if (method === 'POST') {
    const { text, image, desc, tags } = req.body;
    const item = await Items.create({ text, image, desc, tags });
    io.emit('itemUpdated', { action: 'addItem', payload: item });  // Emit the addItem event
    res.json(item);
  }

  if (method === 'PUT') {
    const { id, newItem } = req.body;
    await Items.updateOne({ _id: id }, newItem);
    io.emit('itemUpdated', { action: 'editItem', payload: { id, newItem } });  // Emit the editItem event
    res.json(newItem);
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    if (_id) {
      await Items.deleteOne({ _id });
      io.emit('itemUpdated', { action: 'removeItem', payload: _id });  // Emit the removeItem event
    } else {
      await Items.deleteMany();
      io.emit('itemUpdated', { action: 'clearItems' });  // Emit the clearItems event
    }
    res.json({ message: 'Deleted' });
  }
}
