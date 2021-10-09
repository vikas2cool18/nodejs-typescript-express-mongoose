import {Router} from 'express';
import {UserController} from '../controllers/UserController';
import {UserValidators} from '../validators/UserValidators';
import {GlobalMiddleWare} from '../middlewares/GlobalMiddleWare';
import {Utils} from '../utils/Utils';

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/send/verification/email', GlobalMiddleWare.authenticate, UserController.resendVerificationEmail);
        this.router.get('/login', UserValidators.login(), GlobalMiddleWare.checkError, UserController.login);
        this.router.get('/reset/password', UserValidators.sendResetPasswordEmail(), GlobalMiddleWare.checkError,
            UserController.sendResetPasswordEmail);
        this.router.get('/verify/resetPasswordToken', UserValidators.verifyResetPasswordToken(), GlobalMiddleWare.checkError,
            UserController.verifyResetPasswordToken)
    }

    postRoutes() {
        this.router.post('/signup', UserValidators.signUp(), GlobalMiddleWare.checkError, UserController.signUp);
    }

    patchRoutes() {
        this.router.patch('/verify', GlobalMiddleWare.authenticate, UserValidators.verifyUser(), GlobalMiddleWare.checkError,
            UserController.verify);
        this.router.patch('/update/password', GlobalMiddleWare.authenticate, UserValidators.updatePassword(), GlobalMiddleWare.checkError,
            UserController.updatePassword);
        this.router.patch('/reset/password', UserValidators.resetPassword(), GlobalMiddleWare.checkError, UserController.resetPassword);
        this.router.patch('/update/profilePic', GlobalMiddleWare.authenticate, new Utils().multer.single('profile_pic'), UserValidators.updateProfilePic(), GlobalMiddleWare.checkError,
            UserController.updateProfilePic)
    }

    deleteRoutes() {

    }
}

export default new UserRouter().router;
