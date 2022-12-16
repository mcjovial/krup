const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize')
const userService = require('./users.service');
const Role = require('../_helpers/role');

// routes
router.post('/login', authenticate);
router.post('/register', register);
router.get('/', authorize(Role.ADMIN), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.ADMIN), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticate(req, res, next) {
    const { contact, password } = req.body;
    userService.authenticate({ password, contact })
        .then(({ ...user }) => {
            res.json(user);
        })
        .catch(next);
}

function register(req, res, next) {
    userService.register(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Registration successful!' }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own user and admins can get any user
    if (req.params.id !== req.user.id && req.user.role !== Role.ADMIN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(user => res.json(user))
        .catch(next);
}


function update(req, res, next) {
    // users can update their own user and admins can update any user
    if (req.params.id !== req.user.id && req.user.role !== Role.ADMIN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    // users can delete their own user and admins can delete any user
    if (req.params.id !== req.user.id && req.user.role !== Role.ADMIN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}
