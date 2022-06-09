const client = require("./../redis/index")


module.exports = (router) => {

    router.get("/redis/string", async (req, res) => {
        try {
            await client.set('user12345', 'nurettin');

            res.status(200).json({ message: "user saved" })
        } catch (err) {
            res.status(500).json({ message: "user not saved" })
        }
    })

    router.get("/redis/hash", async (req, res) => {
        try {
            const data = {name:"Fred",age:25}

            for (let index = 0; index < 50; index++) {
              
                await client.hSet('user943230509', `${index}`, JSON.stringify(data));
            }
           

            res.status(200).json({ message: "user hash typed saved" })
        } catch (err) {

            res.status(500).json({ message: err.message })
        }



    })
    router.get("/redis/list", async (req, res) => {
        try {
            await client.lPush("user112", ["arda", "sıla", "kerem"])
            await client.lInsert("user112", "AFTER", "sıla", ["recep"])
            // right ınsert and left instert
            await client.rPush("user112", ["şemşi"])
            await client.rPop("user112") //delete
            const value = await client.lRange("user112", 0, -1) //list all
            const droppedLeft = await client.lPopCount("user112", 2) //hangi key'de ne kadar sılcegımzı belırt ve sana geriye value da neyi sildiklerini döner
            if (droppedLeft) {
                res.status(200).json({ message: `silinen değerler ${droppedLeft}` })
            } else {
                res.status(200).json({ message: `silinen değerler yok ` })
            }
        } catch (err) {

            res.status(500).json({ message: err.message })
        }
    })

    router.get("/redis/set", async (req, res) => {
        try {
            const key = "set"
            const value = await client.sMembers(key)
            await client.sAdd(key, ["Nodejs", "java", "python", "go"]);

            res.status(200).json({ message: "saved", value })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

    router.get("/redis/zset", async (req, res) => {
        //skora dayalı bir veri verdiginizde otomatık sıralar
        try {
            const key = "sorted-set"
            await client.zAdd(key, [
                { score: 4, value: "memet" },
                { score: 2, value: "john" },
                { score: 1, value: "nuri" },
                { score: 3, value: "kerem" }

            ]);
            const value = await client.zRange(key, 0, -1)
            res.status(200).json({ message: "saved", value })

        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })


    router.get("/redis/json", async (req, res) => {

        try {
            const language = {
                typeField: "backend",
                name:"Node js",
                speed:"awesome",
                main:"javascript",
                using:100000,
                framework:["express","nest js","moleculer js"]
            }
            const key = "json"
            
            await client.json.set(key,"$",language)

            let value = await client.json.get(key)
            res.status(200).json({ message: "saved type json", value })

        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })


    }