import { Router } from 'express';
import { createAccount, getLink, getUser, getUserBytHandle, login, searchUserByHandle, updateLink, updateLinkOrder, updateProfile } from './handlers/index';
import { body } from 'express-validator'
import { handleInputErrors } from './middleware/validation';
// import { authenticate } from './middleware/authenticateMio';
import { authenticate } from './middleware/authJuanDeLaTorre';
import User from './models/User';
import { uploadMiddleware } from './middleware/multer';
import { isValidUrl } from './utils/validUrl';
const router:Router = Router();

declare global {
    namespace Express {
        interface Request { 
            user?:User | null;
        }
    }
}
//Routing
// Autenticación y Registro
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('Handle is required'),
    body('name')
        .notEmpty()
        .withMessage('Name is required'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    handleInputErrors,
    createAccount )

router.post('/auth/login',
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    handleInputErrors,
    login);

router.get('/user',authenticate, getUser);

router.get('/auth/verify', authenticate, (req, res) => {  
    res.status(200).json({ authenticated: true, user: req.user });
})

router.put('/user', 
    authenticate,
    uploadMiddleware, 
    body('handle')
    .notEmpty()
    .withMessage('Handle is required'),
    body('description')
    .optional(),
    updateProfile
)

router.put(
  "/link",
  authenticate,

  body("links")
    .isArray()
    .withMessage("links debe ser un array"),

  body("links.*.name")
    .notEmpty()
    .withMessage("El nombre es requerido"),

    body("links.*.url")
    .custom((value, { req, path }) => {
        if (!value) {
        return true;
        }

        if (!isValidUrl(value)) {
        const index = Number(path.match(/\[(\d+)\]/)?.[1]);

        const linkName = req.body.links[index].name;

        throw new Error(
            `La URL de ${linkName} no es válida`
        );
        }

        return true;
    }),
  body("links.*.enabled")
    .isBoolean()
    .withMessage("enabled debe ser boolean"),
  handleInputErrors,
  updateLink

);

router.get('/link',authenticate, getLink);

router.put('/link/order', authenticate, updateLinkOrder);

router.get('/user/:handle', getUserBytHandle);

router.post('/search',
    body('handle')
        .notEmpty()
        .withMessage('El handle es requerido'),
    handleInputErrors, 
    searchUserByHandle);

export default router;