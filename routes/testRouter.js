module.exports = (router) => {
    
router.get("/test",async(req,res)=>{
res.status(200).json({
    testCondition:"succesfull"
})
})


}