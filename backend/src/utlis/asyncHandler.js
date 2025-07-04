const asyncHandler = (userhandler) =>{
    return (req , res , next )=>{
        Promise.resolve(userhandler(req , res , next))
        .catch((error)=>{next(error)})
    }
}


export default  asyncHandler  