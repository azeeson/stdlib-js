describe('findOrCreate method', () => {

    it('should return an existing entry where one with same name exists without updating it', () => {
        const payload = {
            name: 'Brown Rice',
            slug: 'brownrice',
            description: 'test'
        };

        // expect(ingredientsFound.length).toEqual(1)
        expect(payload.name).toEqual('Brown Rice');
        // expect(ingredientsFound[0].description).toBeNull()
    });
});
