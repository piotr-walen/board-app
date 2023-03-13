import { Type, Static } from "@sinclair/typebox";
import { idSchema } from "../shared/schemas/idField.schema";


export const boardSchema = Type.Object({
    id: idSchema,
	name: Type.String(),
});

export type StoredBoard = Static<typeof boardSchema>;
