import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { createCustomer } from '../../db/queries';
import { CreateCustomerDto } from "@fiskaly/customer-model";

export default async function addCustomer(fastify: FastifyInstance){
  fastify.route({
    method: 'POST',
    url: '/api/customer',
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
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          mail: { type: 'string' },
        },
      }
    },
    preHandler: (request: FastifyRequest, reply: FastifyReply, done) => {
      done();
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const customerResult: { customerId: string } = await createCustomer(request.body as CreateCustomerDto);
      reply.send(customerResult);
    }
  });
}
