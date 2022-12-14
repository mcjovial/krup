const Farm = require("./farm.model");

async function create(id, params) {
  params.farmer = id;
  return await Farm.create(params);
}
async function getAll() {
  return await Farm.find({}).populate("crop");
}
async function getForOne(id) {
  return await Farm.find({ farmer: id }).populate("crop");
}
async function getById(id) {
  return await Farm.findById(id).populate("crop");
}
async function update(id, params) {
  return await Farm.findByIdAndUpdate(id, { ...params });
}
async function _delete(id) {
  await Farm.findByIdAndRemove(id);
  return;
}

module.exports = {
  create,
  getAll,
  getForOne,
  getById,
  update,
  delete: _delete,
};
