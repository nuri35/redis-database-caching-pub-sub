const fetch = require("node-fetch")

const msArr = []
const msCachedArr = []
const unCachedUrl = "http://localhost:7000/api/cached/messages"
const cachedUrl = "http://localhost:7000/api/cached/messages-cached"

const fetcher = async (cached = false ) =>{
    const url = cached ? cachedUrl : unCachedUrl;
    const date1 = new Date()
    const response = await fetch(url)
    const json = response.json()
    const date2 = new Date()

    const ms = date1 - date2

    if(cached){
        msCachedArr.push(ms)
    }else{
        msArr.push(ms)
    }
}

const average = (arr)=>{
    const sum = arr.reduce((a,b)=>{
            return a+b
    },0)
    const length = arr.length;
    return sum / length
}

const length = 1000;
const stopPoint = 1000

const stop = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve()
        },3000);
    })
}

const start = async()=>{

        const finished = ()=>{
           
                if(msArr.length === length){
                    console.log("finished uncached fetching")
                    startCached().then(()=>{

                    }).catch(err=>{

                    })
                }    
        }
        for (let i = 0; i < length; i++) {
            if (i%stopPoint === 0){
                await stop()
            }
            console.log("fetching uncached",i+1, "th data")
            fetcher(false).then((data)=>{
                finished()
            }).catch(err=>{
                 msArr.push(30000)
                 finished()
            })
        
            
        }



   
}

const startCached = async()=>{
   
  
    const finished = ()=>{
           
        if(msCachedArr.length === length){
            console.log("finished cached fetching")
            console.log("Average of uncached redis database: ", average(msArr))
            console.log("Average of cached redis : ", average(msCachedArr))
           
        }    
}
for (let i = 0; i < length; i++) {
    if (i%stopPoint === 0){
        await stop()
    }
    console.log("fetching cached",i+1, "th data")
    fetcher(true).then((data)=>{
        finished()
    }).catch(err=>{
        console.log(err)
         msCachedArr.push(30000)
         finished()
    })

    
}
    
}


start().then(()=>{
   
}).catch(err=>{
   
})