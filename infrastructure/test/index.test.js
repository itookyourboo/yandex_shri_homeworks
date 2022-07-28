describe('Index test', () => {
    it('This test will be passed', () => {
        expect(1 + 2).toBe(3);
    });

    it('Maybe yes maybe no maybe go ...', () => {
        expect(Math.random()).toBeGreaterThan(0.5);
    });
})