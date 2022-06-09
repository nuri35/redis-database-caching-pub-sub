const client = require("./../redis/index")

module.exports = (router) => {
    
    router.get("/cached/user",async(req,res)=>{
   
      const obj =   await client.hGetAll("user943230509")
  
        res.send(obj)

    })

    router.get("/cached/users-cached",async(req,res)=>{
        
        try{
            const cacheKey ="users/first50";
            let users = await client.get(cacheKey)

            if(!users){ //eğer cache ' de yoksa gidicek redis veya baska databaseden 50 adet kullanıcı verısını alacak bunu cache kaydetcek yanı redise yazıcaz
                console.log("databaseden aldı")
                users =  await client.hGetAll("user943230509") //database sorgusu postregsql olur mongodb olur vs 
                await client.set(cacheKey,JSON.stringify(users)) //redise yazıyoruz 

            }else{//eğer cache yazdıgımız varsa redise yazdıgımız yanı direk redisden okuyoruz
                console.log("redisden aldı")
                users = JSON.parse(users)
            }

            res.send(users)

        }catch(err){
            console.log(err)
        }
         
        

  
      })
}