import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { CreateMeasurementController } from '../controllers/CreateMeasurementController';
import { ConfirmMeasurementController } from '../controllers/ConfirmMeasurementController';
import { ListMeasurementsController } from '../controllers/ListMeasurementController'

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.post('/measurements', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateMeasurementController().handle(request, reply);
});

fastify.patch('/measurements/confirm', async (request: FastifyRequest, reply: FastifyReply) => {
    return new ConfirmMeasurementController().handle(request, reply);
});

fastify.get('/measurements/:customerCode/list', async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListMeasurementsController().handle(request, reply);
});
}
