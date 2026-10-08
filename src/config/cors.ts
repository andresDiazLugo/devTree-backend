import { CorsOptions } from 'cors';
import config from './config';

export const corsConfig: CorsOptions = {
    origin: [config.frontend.origin],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};