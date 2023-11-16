export const healthCheckController = (req, res) => {
  res.status(200).json({
    data: "OK!",
  });
};
