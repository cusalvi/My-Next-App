// export default async function GET(url) {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log("data", data)
//     return data
// }

export async function handler(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log({data})
    return data
}
