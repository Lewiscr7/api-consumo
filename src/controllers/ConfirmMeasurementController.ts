import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../utils/prismaClient';

export class ConfirmMeasurementController {
async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
    const { measureUuid, confirmedValue } = request.body as any;

    const updatedMeasurement = await prisma.measurement.updateMany({
        where: { id: measureUuid },
        data: { measureValue: confirmedValue },
    });

    if (updatedMeasurement.count === 0) {
        return reply.status(404).send({ error: 'Measurement not found' });
}

    reply.status(200).send(updatedMeasurement);
    } catch (error) {
        reply.status(500).send({ error: 'Internal Server Error' });
    }
}
}
