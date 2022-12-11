const Farm = require("../farm/farm.model");
const Role = require("../_helpers/role");
const Crop = require("./crops.model");

async function create(params) {
  console.log(params);
  await Crop.create({ ...params })
}
async function getAll() {
  return await Crop.find({});
}
async function getById(id) {
  return await Crop.findById(id);
}
async function search({ ph, loc, nit, pot, pho, siol }) {

}
async function farm({ user, query, params, body }) {
  const newFarm = { ...body, crop: params.id, farmer: user.id };
  await Farm.create({ ...newFarm });
  return;
}
async function _delete(id) {
  await Crop.findByIdAndRemove(id);
  return;
}

module.exports = {
  create,
  getAll,
  getById,
  search,
  farm,
  delete: _delete,
};
