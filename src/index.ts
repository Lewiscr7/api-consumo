import Fastify from 'fastify';
import { routes } from './routes/routes';

// Defina a variável de ambiente diretamente
const GOOGLE_GEMINI_API_KEY = 'AIzaSyBV1sb_AfudXiCvhI97Dtqc0F1_S7yGePg';

const fastify = Fastify({ logger: true });


fastify.decorate('googleGeminiApiKey', 'AIzaSyBV1sb_AfudXiCvhI97Dtqc0F1_S7yGePg');

fastify.register(routes);

fastify.listen({ port: 3000 }, (err, address) => {
if (err) {
    fastify.log.error(err);
    process.exit(1);
}
fastify.log.info(`Server listening at ${address}`);
});
