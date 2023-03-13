import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify from 'fastify';

import { boardRouter } from './board/board.router';

export const server = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

server.register(boardRouter, { prefix: '/board' });

const start = async () => {
  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start();