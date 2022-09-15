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
            type: 'string' // TODO: add UUID support as type
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
    // this function is executed for every request before the handler is executed
    preHandler: (request: FastifyRequest, reply: FastifyReply, done) => {
      // E.g. check authentication
      done();
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      console.log({ reqBody: request.body });
      const customerResult: { customerId: string } = await createCustomer(request.body as CreateCustomerDto);

      reply.send(customerResult);
    }
  });
}
