import { FastifyInstance } from 'fastify';
import customers from './customers';
import createCustomer from './createCustomer';

declare module 'fastify' {
    interface FastifyInstance {
    }
}

export default async function(fastify: FastifyInstance) {
    fastify.register(customers);
    fastify.register(createCustomer);
}
