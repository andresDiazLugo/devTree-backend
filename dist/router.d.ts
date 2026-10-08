import { Router } from 'express';
import User from './models/User';
declare const router: Router;
declare global {
    namespace Express {
        interface Request {
            user?: User | null;
        }
    }
}
export default router;
