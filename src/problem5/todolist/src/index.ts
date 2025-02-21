import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import { connectionSource } from './config/typeorm';
import { setLog } from '../src/common/logger.helper';
import routes from '../src/routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

async function bootstrap() {
    try {
        // Database connection
        await connectionSource.initialize();
        setLog({
            level: 'info',
            method: 'DatabaseConnection',
            message: '📦 Database connected successfully'
        });

        // Middlewares
        app.use(morgan('dev')); // Logging HTTP requests
        app.use(express.json()); // Parsing JSON bodies
        app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded bodies

        // Routes
        app.use('/api', routes);

        // Start server
        app.listen(PORT, () => {
            setLog({
                level: 'info',
                method: 'ServerStartup',
                message: `🚀 Server running on http://localhost:${PORT}`
            });
        });
    } catch (error: any) {
        setLog({
            level: 'error',
            method: 'DatabaseConnection',
            message: '❌ Database connection failed',
            error
        });
    }
}

bootstrap();
