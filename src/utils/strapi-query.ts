export class StrapiQuery {
    private baseUrl: string;
    private params: string[];

    constructor(endpoint: string) {
        this.baseUrl = `http://159.89.205.46:1337/api/${endpoint}`;
        this.params = [];
    }

    setLocale(locale: string): this {
        this.params.push(`locale=${locale}`);
        return this;
    }

    setPagination(pageSize: number, withCount: boolean = true): this {
        this.params.push(`pagination[pageSize]=${pageSize}`);
        this.params.push(`pagination[withCount]=${withCount}`);
        return this;
    }

    setSort(field: string, order: 'asc' | 'desc'): this {
        this.params.push(`sort=${field}:${order}`);
        return this;
    }

    setFilter(field: string, operator: string, value: string): this {
        this.params.push(`filters[${field}][${operator}]=${value}`);
        return this;
    }

    toString(): string {
        return `${this.baseUrl}?${this.params.join('&')}`;
    }
}