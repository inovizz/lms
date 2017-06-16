import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();
const AuthCtrl = new AuthController();

// router.route('/')

router.route('/create_account')
    /** GET /api/auth/create_account - Create account of member */
    .post(AuthCtrl.createAccount);

export default router;