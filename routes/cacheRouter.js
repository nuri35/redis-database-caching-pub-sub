const client = require("./../redis/index")

module.exports = (router) => {
    
    router.get("/cached/users",async(req,res)=>{
   
      const obj =   await client.hGetAll("user943230509")
  
        res.send(obj)

    })

    router.get("/cached/users-cached",async(req,res)=>{
        
        try{
            const cacheKey ="users/first50";
            let users = await client.get(cacheKey)

            if(!users){ 
               
                users =  await client.hGetAll("user943230509") 
                await client.set(cacheKey,JSON.stringify(users))

            }else{
                users = JSON.parse(users)
            }

            res.send(users)

        }catch(err){
            console.log(err)
        }
         
      })

/* Absolute timing  */
      router.get("/cached/users",async(req,res)=>{
   
      })
}