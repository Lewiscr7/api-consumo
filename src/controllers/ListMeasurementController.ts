import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../utils/prismaClient';

export class ListMeasurementsController {
async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
    const { customerCode } = request.params as any;
    const measureType = (request.query as any).measure_type;

    const measurements = await prisma.measurement.findMany({
        where: {
            customerCode,
            measureType: measureType ? { equals: measureType, mode: 'insensitive' } : undefined,
        },
    });

    reply.status(200).send(measurements);
    } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
    }
}
}
