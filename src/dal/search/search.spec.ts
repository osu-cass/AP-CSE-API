import { SearchClient } from '.';

describe('search', () => {
    let client: SearchClient;

    beforeAll(() => {
        client = new SearchClient();
    });

    it('inserts claims into es', () => {
        expect.assertions(0);
    });

    it('fails to claims into es', () => {
        expect.assertions(0);
    });
});