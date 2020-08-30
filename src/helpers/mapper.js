export default hits =>
    hits.map(hit => ({
        id: hit.id,
        smallImg: hit.webformatURL,
        bigImg: hit.largeImageURL,
    }));
