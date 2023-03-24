const PORT = process.env.PORT || 3015;

app.get('/notes', (req, res) =>
  res.send(
    `index.html`
  )
);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
