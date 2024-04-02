
export default {
    Query: {
        hello: (root: any, { name }: { name: string }, ctx: any) => {
            return `Hello ${name || "World"}`;
        },
    },
}