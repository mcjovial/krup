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
async function search({ user, query }) {
  const { ph, loc, nit, pot, pho, soil } = query
  console.log(ph, loc, nit, pot, pho, soil);
  // const crops = await Crop.find({}).where('potassium.min').equals(10).where('phosphorus.min').gt(24)
  return crops = await Crop.find({
      'ph.min': { $lt: ph },
      'ph.max': { $gt: ph },
      'nitrogen.min': { $lt: nit },
      'nitrogen.max': { $gt: nit },
      'potassium.min': { $lt: pot },
      'potassium.max': { $gt: pot },
      'phosphorus.min': { $lt: pho },
      'phosphorus.max': { $gt: pho },
      'soil_moisture.min': { $lt: soil },
      'soil_moisture.max': { $gt: soil },
    })
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
