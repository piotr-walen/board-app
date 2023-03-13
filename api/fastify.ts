import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { TSchema, Static } from '@sinclair/typebox'


export interface FastifyTypeProvider {
    input: unknown;
    output: unknown;
}

declare module 'fastify' {
  interface FastifyTypeProviderDefault extends FastifyTypeProvider {
    output: this['input'] extends TSchema ? Static<this['input']> : never
  }
}



