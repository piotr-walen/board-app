
export const IdGenerator = (init: number = 0) => {
    let nextId = init;

    const generateId = () => {
        nextId++;
        return nextId;
    };

    return { generateId };
}

