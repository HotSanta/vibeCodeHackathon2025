const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let ideas = [
  { id: 1, title: "AI Tutor", desc: "Personalized tutoring powered by AI", ignites: 3, comments: [] },
  { id: 2, title: "Drone Courier", desc: "Small drones delivering local packages", ignites: 5, comments: [] },
];

// Get all ideas
app.get("/ideas", (req, res) => res.json(ideas));

// Add a new idea
app.post("/ideas", (req, res) => {
  const { title, desc } = req.body;
  if (!title || !desc) return res.status(400).json({ error: "Missing title or desc" });
  const newIdea = { id: ideas.length + 1, title, desc, ignites: 0, comments: [] };
  ideas.push(newIdea);
  console.log(`💡 New idea added: ${title}`);
  res.json(newIdea);
});

// Ignite (upvote) an idea
app.post("/ignite/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idea = ideas.find(i => i.id === id);
  if (!idea) return res.status(404).json({ error: "Idea not found" });
  idea.ignites++;
  console.log(`🔥 Idea ${id} ignited! Now at ${idea.ignites}`);
  res.json(idea);
});

// Add a comment to an idea
app.post("/ideas/:id/comments", (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body;
  const idea = ideas.find(i => i.id === id);
  if (!idea) return res.status(404).json({ error: "Idea not found" });
  if (!text) return res.status(400).json({ error: "Missing comment text" });
  const comment = { text, time: new Date().toLocaleString() };
  idea.comments.push(comment);
  console.log(`💬 Comment added to idea ${id}: ${text}`);
  res.json(comment);
});

app.listen(PORT, () => console.log(`🚀 Ignite server running at http://localhost:${PORT}`));
