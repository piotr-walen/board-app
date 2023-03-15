import { getKeys } from "../shared/utils/getKeys";
import { IdGenerator } from "../shared/utils/idGenerator";
import { StoredBoard } from "./board.schema";

const { generateId } = IdGenerator();

const initialModels: StoredBoard[] = [
	{ id: generateId(), name: "Board 1" },
	{ id: generateId(), name: "Board 2" },
	{ id: generateId(), name: "Board 3" },
];

export const BoardModel = () => {
	const models: StoredBoard[] = initialModels;

	return {
		create: async (board: Omit<StoredBoard, "id">) => {
			const id = generateId();
			const newBoard = { ...board, id };
			models.push(newBoard);
			return newBoard;
		},
		read: async (params?: Partial<StoredBoard>) => {
			if (!params) return [...models];
			return models.filter((model) => {
				return getKeys(params).every((key) => {
					return model[key] === params[key];
				});
			});
		},
		update: async (
			params: Pick<StoredBoard, "id">,
			board: Omit<StoredBoard, "id">,
		) => {
			const index = models.findIndex((model) => {
				return getKeys(params).every((key) => {
					return model[key] === params[key];
				});
			});
			if (index !== -1) {
				models[index] = { id: params.id, ...board };
			}
		},
		delete: async (params: Pick<StoredBoard, "id">) => {
			const index = models.findIndex((model) => {
				return getKeys(params).every((key) => {
					return model[key] === params[key];
				});
			});
			if (index !== -1) {
				models.splice(index, 1);
			}
		},
	};
};
