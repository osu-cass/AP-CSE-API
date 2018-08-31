let express = require.requireActual('express');
const router = require.requireActual('express').Router;

const application = {
    use: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    listen: jest.fn().mockImplementation((num, func) => func()),
};

express = jest.fn().mockImplementation(() => ({
    ...express,
    ...application
}));

export const use: jest.Mock = application.use;
// tslint:disable:no-reserved-keywords
export const get: jest.Mock = application.get;
export const post: jest.Mock = application.post;
export const listen: jest.Mock = application.listen;

// tslint:disable:no-default-export
export default express;