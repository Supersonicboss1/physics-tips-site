type Data = { title: string, author?: string, tags: string[], link?: string }[]

export default function search(data: Data, query: string) {
    if (query === "") {
        return data;
    }
    const results = [];

    for (const item of data) {
        // if author is not defined, then it will not be searched for
        const searchableText = item.author ? item.title + " " + item.author : item.title;
        if (searchableText.toLowerCase().includes(query.toLowerCase())) {
            results.push(item);
            break;
        }
    }
    return results;
}
