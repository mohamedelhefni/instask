export interface Pagination {
    next?: number
    prev?: number
    currentPage?: number
    pages?: number
    total?: number
}


export const createPagination = (page: number, limit: number, count: number): Pagination => {
    const pagination: Pagination = {};
    const pages = Math.ceil(count / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (endIndex < count) {
        pagination.next = +page + 1;
    }
    if (startIndex > 0) {
        pagination.prev = page - 1;
    }
    pagination.pages = pages;
    pagination.currentPage = page;
    pagination.total = count;
    return pagination;
}