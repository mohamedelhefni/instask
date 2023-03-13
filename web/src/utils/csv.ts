import { Event } from "../types/types"

const isObj = (o: any) => o?.constructor === Object;


function JSONToCSV(data: any[]): string {
    //@ts-ignore
    const replacer = (key, value) => isObj(value) ? Object.values(value).slice(0, -2).join("|") : value;
    const header = Object.keys(data[0])
    const csv = [
        header.join(','), // header row first
        //@ts-ignore
        ...data.map((row: any) => header.map((fieldName: string) => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    return csv;
}


export function downloadCSV(data: any[]) {
    const csv = JSONToCSV(data)
    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
    link.setAttribute('download', "logs.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

