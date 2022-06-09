const TestRouterFn = require("./testRouter");
const RedisRouterFn = require("./redisRouter");
const CacheRouterFn = require("./cacheRouter");

const RouterArrFns = [
    TestRouterFn,
    RedisRouterFn,
    CacheRouterFn
    
]

module.exports = RouterArrFns