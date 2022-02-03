import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validateRequest';
import { BadRequestError } from '../errors/BadRequest';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/singup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be valid'),
], validateRequest,
async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const hasExistingUser = await User.findOne({email});

    if (hasExistingUser) {
        throw new BadRequestError('Email is in use')
    }

    const user = User.build({email, password})
    await user.save();

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_KEY!)

    req.session = {
        ...req.session,
        jwt: userJwt,
    };

    res.send({user});
})

export { router as SignUpRouter };