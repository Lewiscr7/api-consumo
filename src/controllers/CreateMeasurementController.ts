import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../utils/prismaClient';
import { analyzeImage } from '../services/googleGeminiService';

export class CreateMeasurementController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { customerCode, measureDatetime, measureType, image } = request.body as any;

      
      const analysisResult = await analyzeImage(image);

      
      const extractedValue = analysisResult.value; 

      
      const newMeasurement = await prisma.measurement.create({
        data: {
          customerCode,
          measureDatetime,
          measureType,
          imageUrl: analysisResult.imageUrl, 
          measureValue: extractedValue,
        },
      });

      reply.status(201).send(newMeasurement);
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
