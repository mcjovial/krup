const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const userService = require('./users.service');
const Role = require('../_helpers/role');

// routes
router.post('/login', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(Role.ADMIN), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.ADMIN), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string(),
        contact: Joi.string(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    const { email, contact, password } = req.body;
    userService.authenticate({ email, password, contact })
        .then(({ ...user }) => {
            res.json(user);
        })
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        role: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email(),
        contact: Joi.number(),
        password: Joi.string().min(6).required(),
        // confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    });
    validateRequest(req, next, schema);
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

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        role: Joi.string().valid(Role.ADMIN, Role.PATRON).required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schemaRules = {
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    };

    // only admins can update role
    if (req.user.role === Role.ADMIN) {
        schemaRules.role = Joi.string().valid(Role.ADMIN, Role.PATRON).empty('');
    }

    const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
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
