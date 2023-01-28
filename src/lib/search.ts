type Data = {title:string,author:string,tags:string[],link:string}[]

export default function search(data: Data, query: string) {
    if (query === "") {
        return data;
    }
    const results = [];
    for (const item of data) {
        const searchableText = item.title + " " + item.author;
            if(searchableText.toLowerCase().includes(query.toLowerCase())){
                results.push(item);
                break;
            }
    }
    console.log(results);
    return results;
}
