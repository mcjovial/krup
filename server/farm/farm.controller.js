const router = require("express").Router();
const Role = require("../_helpers/role");
const authorize = require("../_middleware/authorize");
const farmService = require("./farm.service");

router.post("/", authorize(), create);
router.get("/", authorize(Role.ADMIN), getAll);
router.get("/user/", authorize(Role.PATRON), getForOne);
router.get("/:id", authorize(), getById);
router.put("/:id", authorize(), update);
router.delete("/:id", authorize(), _delete);

module.exports = router;

function create(req, res, next) {
  farmService
    .create(req.user.id, req.body)
    .then(() => res.json({ message: "Farm Added successfully!" }))
    .catch(next);
}

function getAll(req, res, next) {
  farmService
    .getAll()
    .then((data) => res.json(data))
    .catch(next);
}

function getForOne(req, res, next) {
  farmService
    .getForOne(req.user.id)
    .then((data) => res.json(data))
    .catch(next);
}

function getById(req, res, next) {
  farmService
    .getById(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch(next);
}

function update(req, res, next) {
  farmService
    .update(req.params.id, req.body)
    .then((data) => res.json(data))
    .catch(next);
}

function _delete(req, res, next) {
  farmService
    .delete(req.params.id)
    .then(() => res.json({ message: "Subject deleted successfully" }))
    .catch(next);
}
