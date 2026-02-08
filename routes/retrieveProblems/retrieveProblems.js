import { fetchProblems, saveAssignments } from "./externalFetch/fetchProblems.js"
export async function retrieveHandlerStub1(userId){

    
}
export async function newUserProblems(req,res){
    //retrieveHandler
    
    const userRating = await fetchUserRating(userHandler);
    const assignments = await generateAssignments(userRating);
    
    saveAssignments(assignments);
    return res.json(assignments)
    

}
export async function retrieveTrackRecordStub(handler){
    
    if(!handler) {throw new Error("error")}

}

export async function checkFinishedTask(assignedProblemID,trackRecords){
    const finishedTasks = trackRecords.filter(submission=>(assignedProblemID.includes(submission.contestId)))
    const result = finishedTasks.map(record =>({contestId:record.contestId,verdict:record.verdict}))
    return result
}

//user will get 15 assignments ranging from (their rating ~ rating+200)
export async function generateAssignments(userRating){
    
    if(!(Number.isInteger(userRating) )){
        throw new Error("error")
    }

    const problems = await fetchProblems();
    
    const FlooredUserRating = Math.floor(userRating / 100) * 100;
    const filteredProblems = problems.
        filter(problem => problem.rating <= FlooredUserRating+200 && problem.rating >= FlooredUserRating);
    
    return (filteredProblems.slice(0,15));

}

