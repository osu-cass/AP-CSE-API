jest.mock('../', () => ({
  setRouteHealth: jest.fn().mockResolvedValue('{}'),
  Health: jest.fn().mockImplementation(() => {
    enum Health {
      good = 'OK',
      bad = 'This resource is either not running or not working. Better fix it.',
      busy = 'This resource is busy, please try again later.'
    }
  })
}));
