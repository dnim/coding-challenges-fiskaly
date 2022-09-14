import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { getCustomers } from '../../db/queries';
import { GetCustomerDto } from "@fiskaly/customer-model";

export default async function customers(fastify: FastifyInstance){
  fastify.route({
    method: 'GET',
    url: '/api/customer',
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            customer_id: {
              type: 'string'
            },
            first_name: {
              type: 'string'
            },
            last_name: {
              type: 'string'
            },
            mail: {
              type: 'string'
            }
          }
        }
      },
    },
    // this function is executed for every request before the handler is executed
    preHandler: (request: FastifyRequest, reply: FastifyReply, done) => {
      // E.g. check authentication
      done();
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const customersRawResult: any[] = await getCustomers();

      const customersResult = convertToDto(customersRawResult);

      console.log({ customersResult })

      reply.send(customersResult);
    }
  });
}

const convertToDto = (queryResult: any[]): GetCustomerDto[] => {
  return queryResult.map(({ customer_id, first_name, last_name,mail }) => ({
    id: customer_id,
    firstName: first_name,
    lastName: last_name,
    mail
  }))
}
