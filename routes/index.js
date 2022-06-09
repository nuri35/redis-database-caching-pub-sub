const TestRouterFn = require("./testRouter");
const RedisRouterFn = require("./redisRouter");

const RouterArrFns = [
    TestRouterFn,
    RedisRouterFn
    
]

module.exports = RouterArrFns