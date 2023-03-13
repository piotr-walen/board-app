import { FastifyInstance } from "fastify";
import { 
  StatusCodes,
} from 'http-status-codes';

import { BoardModel } from "./board.model";
import { Type } from "@sinclair/typebox";
import { boardSchema } from "./board.schema";


export const boardRouter = async (fastify: FastifyInstance) => {
	fastify.decorateRequest("board", null);

	fastify.route({
		method: "POST",
		url: "/",
		schema: {
			body: Type.Omit(boardSchema, ['id']),
			response: {
				default: boardSchema
			},
		},
		handler: async (req, res) => {
			const board = await BoardModel().create(req.body);
			res.code(StatusCodes.CREATED).send(board);
		},
	});

	fastify.route({
		method: "GET",
		url: "/",
		schema: {
			response: {
				default: Type.Array(boardSchema),
			},
		},
		handler: async (req, res) => {
			const boards = await BoardModel().read();
			res.code(StatusCodes.OK).send(boards);
		},
	});

	fastify.route({
		method: "GET",
		url: "/:id",
		schema: {
			params: Type.Pick(boardSchema, ['id']),
			response: {
				default: boardSchema,
			},
		},
		handler: async (req, res) => {
			const boards = await BoardModel().read(req.params);
			res.code(StatusCodes.OK).send(boards[0]);
		},
	});

  fastify.route({
		method: "PUT",
		url: "/:id",
		schema: {
			params: Type.Pick(boardSchema, ['id']),
			body: Type.Omit(boardSchema, ['id']),
		},
		handler: async (req, res) => {
			await BoardModel().update(req.params, req.body);
      res.code(StatusCodes.NO_CONTENT).send();
		},
	});

  fastify.route({
		method: "DELETE",
		url: "/:id",
		schema: {
			params: Type.Pick(boardSchema, ['id']),
		},
		handler: async (req, res) => {
			await BoardModel().delete(req.params);
			res.code(StatusCodes.NO_CONTENT).send();
		},
	});
};
