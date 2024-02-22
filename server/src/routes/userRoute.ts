import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

// get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a user by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create new user
router.post('/', async (req: Request, res: Response) => {
  const { firstName, lastName, username, email, password, avatar, userType } = req.body;
  try {
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      avatar,
      userType
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    const userUpdated = await User.findById(req.params.id);
    res.status(201).json(userUpdated);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('Account has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;