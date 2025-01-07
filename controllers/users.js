export const getAllUsers = async (req, res) => {
  res.status(200).json("Obteniendo todos los usuarios");
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({"Usuario con id":id});
};
