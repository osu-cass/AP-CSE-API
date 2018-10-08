let elasticsearch = require.requireActual('elasticsearch');

const client = {
  exists: jest.fn().mockResolvedValue(true),
  delete: jest.fn().mockResolvedValue({}),
  create: jest.fn().mockResolvedValue({}),
  search: jest.fn().mockResolvedValue({ hits: { hits: [] } })
};

const Client = jest.fn().mockImplementation(() => client);

elasticsearch = {
  Client,
  ...elasticsearch
};

const esExists: jest.Mock = client.exists;
const esDelete: jest.Mock = client.delete;
const esCreate: jest.Mock = client.create;
const esSearch: jest.Mock = client.search;

export { elasticsearch, Client, esExists, esDelete, esCreate, esSearch };