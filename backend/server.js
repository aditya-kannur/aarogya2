const express = require('express');
const mongoose = require('mongoose');
const Document = require('./models/Document');
const dummyData = require('./data');
// const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB connection
mongoose
  .connect('mongodb+srv://adityakannur:Aditya252004@cluster0.5zhqbdd.mongodb.net/Aarogya_Database2?retryWrites=true&w=majority&appName=Cluster0PORT=3000', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.post('/upload', async (req, res) => {
  try {
    const insertedDocs = [];

    for (const entry of dummyData) {
      const exists = await Document.findOne({ execution_id: entry.execution_id });
      if (!exists) {
        const doc = new Document(entry);
        await doc.save();
        insertedDocs.push(doc);
      }
    }

    res.status(201).json({
      message: `${insertedDocs.length} documents inserted.`,
      inserted: insertedDocs
    });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload" });
  }
});


// GET /documents — fetch all docs
app.get('/documents', async (req, res) => {
  const docs = await Document.find({});
  res.json(docs);
});

// GET /documents/:id — fetch single doc
app.get('/documents/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch {
    res.status(400).json({ error: "Invalid ID format" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
