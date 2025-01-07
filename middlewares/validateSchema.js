const validateSchema = schema => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    res.status(400).json({
      error: "Error de validación",
      detalles: error.errors,
    });
  }
};

export default validateSchema;
