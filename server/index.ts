import express from 'express';
import accountRouter from './account/accountRouter';
import authRouter from './auth/authRouter';
import profileRouter from './profile/profileRouter';

const PORT = 4000;

const app = express();
const router = express.Router();

router.use(express.json());
router.use('/auth', authRouter);
router.use('/account', accountRouter);
router.use('/profile', profileRouter);

app.use('/api', router);

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
