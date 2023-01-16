const searchService = {
    baseUrl: 'https://pixabay.com/api/?',
    userKey: '31919812-408775081e2c7a787d06e9cb3',
    currentQuery: '',
    pageNumber: 1,
    resultsPerPage: 12,
    imageType: 'photo',

    makeSearchParams() {
        return new URLSearchParams({
            key: this.userKey,
            q: this.currentQuery,
            page: this.pageNumber,
            per_page: this.resultsPerPage,
            image_type: this.imageType,
        });
    },

    fetchImages() {
        return fetch(`${this.baseUrl}${this.makeSearchParams()}`);
    },
};

export default searchService;
