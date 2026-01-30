import { fetchProblems } from "./fetchProblems.js"
export async function retrieveHandlerStub1(userId){

    
}
export async function newUserProblems(req,res){
    //retrieveHandler
    const {index} = req.params
    const problemSet = await retrieveProblemsStub(index)
    return res.json(problemSet)
    

}
export async function retrieveTrackRecordStub(handler){
    
    if(!handler) {throw new Error("error")}

}

export async function checkFinishedTask(assignedProblemID,trackRecords){
    const finishedTasks = trackRecords.filter(submission=>(assignedProblemID.includes(submission.contestId)))
    const result = finishedTasks.map(record =>({contestId:record.contestId,verdict:record.verdict}))
    return result
}

export async function retrieveProblemsStub(index){
    if(index instanceof Array || !index){
        throw new Error("error")
    }
    const problems = await fetchProblems();
    const filteredProblems = problems.filter(problem => problem.index ==index);

    return (filteredProblems.slice(0,5));

}
