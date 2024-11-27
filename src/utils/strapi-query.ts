import { API_URL } from "./axios/constants";

export class StrapiQuery {
    private baseUrl: string;
    private params: string[];

    constructor(endpoint: string) {
        this.baseUrl = `${API_URL}/api/${endpoint}`;
        this.params = [];
    }

    setLocale(locale: string): this {
        this.params.push(`locale=${locale}`);
        return this;
    }

    setPagination(pageSize: number, page?: number): this {
        this.params.push(`pagination[pageSize]=${pageSize}`);
        if (page) {
            this.params.push(`pagination[page]=${page}`);
        }
        return this;
    }

    setSort(field: string, order: 'asc' | 'desc'): this {
        this.params.push(`sort=${field}:${order}`);
        return this;
    }


    setFilter(field: string, operator: string, value: string): this {
        this.params.push(`filters[${field}][url][${operator}]=${value}`);
        return this;
    }


    setSearch(search: string): this {
        this.params.push(`&filters[title][$contains]=${search}`);
        return this;
    }

    toString(): string {
        return `${this.baseUrl}?${this.params.join('&')}`;
    }
}