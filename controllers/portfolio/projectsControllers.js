const gravatar = require("gravatar");

const { Projects } = require("../../models/index");

const { ctrlWrapper, HttpError } = require("./../../utils/index");

const getAll = async (req, res) => {
  const { page = 1, limit = 3, difficulty, tech } = req.query;
  const skip = (page - 1) * limit;

  try {
    let query = {};

    // Add additional conditions based on query parameters if needed
    if (tech) {
      query.techStack = new RegExp(tech, "i");
    }

    if (difficulty && difficulty !== "Get All") {
      query.difficulty = difficulty;
    }

    // Fetch documents, apply sorting by createdAt in descending order
    const result = await Projects.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count all projects without pagination for total pages calculation
    const allProjectsCount = await Projects.countDocuments(query);

    const totalPages = Math.ceil(allProjectsCount / limit);

    res.status(200).json({ result, totalPages, allProjectsCount });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAll;

const getDetails = async (req, res) => {
  const { title } = req.params;

  const result = await Projects.find({ title });

  res.status(200).json(result);
};

const addNew = async (req, res) => {
  const { title } = req.body;

  const project = await Projects.create({ ...req.body });

  if (!project) {
    throw HttpError(400, "Unable to save your data");
  }

  const coverUrl = gravatar.url(title);

  res.status(201).json({
    code: 201,
    message: "Successful success",
    data: { ...project, coverImage: coverUrl },
  });
};

const updateOne = async (req, res) => {};

const updateCover = async (req, res) => {
  const { title } = req.body;

  const data = req.file.path;

  const result = await Projects.findOneAndUpdate(
    { title },
    { coverImage: data }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json({ data });
};

const updatePreview = async (req, res) => {
  const { title } = req.body;

  const data = req.file.path;

  const project = await Projects.find({ title });

  const { preview } = project[0];

  preview.push(data);

  const test = (req, res) => {};

  const result = await Projects.findOneAndUpdate(
    { title },
    { preview: preview }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json({ data });
};

const removeOne = async (req, res) => {};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getDetails: ctrlWrapper(getDetails),
  addNew: ctrlWrapper(addNew),
  updateOne: ctrlWrapper(updateOne),
  removeOne: ctrlWrapper(removeOne),
  updateCover: ctrlWrapper(updateCover),
  updatePreview: ctrlWrapper(updatePreview),
};
