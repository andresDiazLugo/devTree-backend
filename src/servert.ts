// const express = require('express'); Common js
import 'dotenv/config';
import cors from 'cors';
import { corsConfig } from './config/cors';
import express from 'express';// ESM EcmaScript Modules
import router from './router';


const app = express();

//configurar cors
app.use(cors(
corsConfig
))

// Leer datos
app.use(express.json());

app.use('/', router);

export default app;