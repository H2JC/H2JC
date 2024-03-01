import express from 'express';
import { auth } from '../middleware/auth';
import { check, validationResult } from 'express-validator';

import Brand from '../models/Brand';
import User from '../models/User';
import { getContext } from "../lib/queryResponse";
import { getResponse } from '../lib/chatModel';

const router = express.Router();

// @route   GET api/brand/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Brand.findOne({
            user: req.user.id,
        }).populate('user', [
            'username',
            'firstName',
            'lastName',
            'avatar',
        ]);

        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/brand/
// @desc    Create or update user profile
// @access  Private
router.post(
    '/',
    [
        auth
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            companyName,
            contactPersonName,
            contactEmail,
            industry,
            preferences
        } = req.body;

        //Build profile object
        const brandFields = {
            user: req.user.id,
            companyName: companyName,
            contactPersonName: contactPersonName,
            contactEmail: contactEmail,
            industry: industry,
            preferences: preferences,
        };

        try {
            let brand = await Brand.findOne({ user: req.user.id });

            //Update if found
            if (brand) {
              brand = await Brand.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: brandFields},
                    { new: true }
                );

                return res.json(brand);
            }

            //Create if not found
            brand = new Brand(brandFields);

            await brand.save();
            res.json(brand);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/brand/
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Brand.find().populate('user', [
            'username',
            'firstName', 
            'lastName',
            'avatar',
        ]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/brand/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Brand.findOne({
            user: req.params.user_id,
        }).populate('user', [
            'username',
            'firstName', 
            'lastName',
            'avatar',
        ]);

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/brand
// @desc    Delete profile, user, & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove user posts
        //await Post.deleteMany({ user: req.user.id });
        // Remove profile
        await Brand.findOneAndDelete({ user: req.user.id });
        // Remove user
        await User.findOneAndDelete({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/brand/query
// @desc    Brand query input
// @access  Private 
router.post('/query', async (req, res) => {  
  try {
    const context = await getContext(req.body.query);
    const ids = context.map(item => item.id);
    const users = await User.find({
      _id: { $in: ids }
    });

    const suggestedUsers = getResponse(req.body.query, users);

    res.status(201).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;