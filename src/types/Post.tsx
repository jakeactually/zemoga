export type Post = {
    name: string,
    description: string,
    category: string,
    picture: string,
    lastUpdated: Date,
    votes: {
        positive: number,
        negative: number
    }
};
