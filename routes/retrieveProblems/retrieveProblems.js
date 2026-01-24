export async function retrieveHandler(userId){

    
}
export async function route(req,res){
    //retrieveHandler
    const userId = retrieveUserId(req.cookies)
    const handler = retrieveHandler(userId)
    const trackRecord = retrieveTrackRecord(handler)
    const problemCriteria = problemSetSelector(trackRecord)
    const problemSet = await retrieveProblems(problemCriteria);
    await saveProblemSet(problemSet)
}

export async function retrieveTrackRecord(handler){
    
    if(!handler) {throw new Error("error")}
    
    return (
        [
            {id:"1",verdict:"OK"},
            {id:"2",verdict:"OK"},
            {id:"3",verdict:"OK"},
            {id:"4",verdict:"OK"},
            {id:"5",verdict:"OK"},
        ]
    )
}
export async function retrieveProblems(index){
    if(index instanceof Array || !index){
        throw new Error("error")
    }
    
    return ([
            {id:"1",index:"OK"},
            {id:"2",index:"OK"},
            {id:"3",index:"OK"},
            {id:"4",index:"OK"},
            {id:"5",index:"OK"},
    ]);

}