let elasticsearch = require.requireActual('elasticsearch');

const client = {
  indices: {
    exists: jest.fn().mockResolvedValue(true),
    create: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
    putMapping: jest.fn().mockResolvedValue({})
  },
  index: jest.fn().mockResolvedValue({}),
  search: jest.fn().mockResolvedValue({ hits: { hits: [] } }),
  ping: jest
    .fn()
    .mockResolvedValueOnce(false)
    .mockResolvedValueOnce(true)
    .mockRejectedValueOnce(new Error('error'))
};

const Client = jest.fn().mockImplementation(() => client);

elasticsearch = {
  Client,
  ...elasticsearch
};

const esExists: jest.Mock = client.indices.exists;
const esDelete: jest.Mock = client.indices.delete;
const esCreate: jest.Mock = client.indices.create;
const esIndex: jest.Mock = client.index;
const esSearch: jest.Mock = client.search;
const esPing: jest.Mock = client.ping;

export { elasticsearch, Client, esExists, esDelete, esCreate, esIndex, esSearch, esPing };
