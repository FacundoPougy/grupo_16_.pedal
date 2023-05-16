const controller = {
  getIndex: (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
  },
};
