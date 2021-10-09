import {Router} from 'express';
import {GlobalMiddleWare} from '../middlewares/GlobalMiddleWare';
import {CommentValidators} from '../validators/CommentValidators';
import {CommentController} from '../controllers/CommentController';

class CommentRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {

    }

    postRoutes() {
        this.router.post('/add/:id', GlobalMiddleWare.authenticate, CommentValidators.addComment(),
            GlobalMiddleWare.checkError, CommentController.addComment);
    }

    patchRoutes() {
        this.router.patch('/edit/:id', GlobalMiddleWare.authenticate, CommentValidators.editComment(),
            GlobalMiddleWare.checkError, CommentController.editComment);
    }

    deleteRoutes() {
        this.router.delete('/delete/:id',GlobalMiddleWare.authenticate,
            CommentValidators.deleteComment(),GlobalMiddleWare.checkError,CommentController.deleteComment)
    }
}

export default new CommentRouter().router;
