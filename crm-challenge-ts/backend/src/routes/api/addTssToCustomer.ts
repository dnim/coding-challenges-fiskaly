import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { connectTssAndCustomer } from '../../db/queries';
import { AddTssResponse, AddTssToCustomerDto } from "@fiskaly/customer-model";

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
          tssId: {
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
    preHandler: (_request: FastifyRequest, _reply: FastifyReply, done) => {
      done();
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const customerResult: AddTssResponse = await connectTssAndCustomer(request.body as AddTssToCustomerDto);
        reply.send(customerResult);
      } catch (error: any) {
        // TODO: not the best approach, but just for demonstration. Proper error handling system should be introduced.
        if (error?.detail?.includes('is not present in table')) {
          reply.status(404);
          reply.send({ error: 'The customer not found.' });
        } else {
          throw new Error(error)
        }
      }
    }
  });
}
