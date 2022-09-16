import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { connectTssAndCustomer } from '../../db/queries';
import { AddTssToCustomerDto } from "@fiskaly/customer-model";

export default async function addTssToCustomer(fastify: FastifyInstance){
  fastify.route({
    method: 'POST',
    url: '/api/customer/:customerId/add-tss',
    schema: {
      response: {
        200: {
          customerId: {
            type: 'string',
            format: 'uuid',
          },
        }
      },
      body: {
        type: 'object',
        properties: {
          customerId: { type: 'string', format: 'uuid' },
          tssId: { type: 'string', format: 'uuid' },
        },
      }
    },
    preHandler: (request: FastifyRequest, reply: FastifyReply, done) => {
      done();
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const customerResult: { customerId: string } = await connectTssAndCustomer(request.body as AddTssToCustomerDto);
      reply.send(customerResult);
    }
  });
}
