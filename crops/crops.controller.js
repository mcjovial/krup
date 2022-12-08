const router = require("express").Router();
const Role = require("../_helpers/role");
const authorize = require("../_middleware/authorize");
const requestService = require("./crops.service");

router.post("/", authorize(Role.ADMIN), create);
router.get("/", authorize(Role.ADMIN), getAll);
router.get("/:id", authorize(Role.ADMIN), getById);
router.post("/farm/:id", authorize(), farm);
router.delete("/:id", _delete);

module.exports = router;

function create(req, res, next) {
  requestService
    .create(req.body)
    .then(() => res.json({ message: "Crop Added successfully!" }))
    .catch(next);
}

function getAll(req, res, next) {
  requestService
    .getAll()
    .then((data) => res.json(data))
    .catch(next);
}

function getById(req, res, next) {
  requestService
    .getById(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch(next);
}

function search(req, res, next) {
  requestService
    .search(req.query)
    .then((data) => res.json(data))
    .catch(next);
}

function farm(req, res, next) {
  requestService
    .farm(req)
    .then((data) => res.json(data))
    .catch(next);
}

function _delete(req, res, next) {
  requestService
    .delete(req.params.id)
    .then(() => res.json({ message: "Crop deleted successfully" }))
    .catch(next);
}
