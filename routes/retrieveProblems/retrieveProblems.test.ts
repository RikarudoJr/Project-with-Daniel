import { describe,test,expect, vi } from "vitest";
import { checkFinishedTask, retrieveHandlerStub, generateAssignments, retrieveTrack, retrieveTrackRecordStub } from "./retrieveProblems.js";
import request from 'supertest';
import sampleProblems from "./SampleProblems.json"
import * as fetchProblemsModule from "./externalFetch/fetchProblems.js"
import sampleTrackRecords from "./SampleTrackRecord.json"
describe("check for finished assigned tasks",()=>{
    /* 
        Pre-condition: 
        - handler === string, handler != null
        
        Post condition:
         -  return (5 latest problemId and verdict)
          
         TODO:
         - This function is still a stub. rewrite the code after decide the logic
         - Change the post condition. 
         the current post condition assume that we will use the 5 latest submissions 
         to determine what problem to generate next. This is wrong. instead, we want to
         see the verdict of the submissions on the previously-generated-problemSets
    */
    test("finishedTask, all assigned tasks is finished, return all assigned task",async()=>{
        const assignedProblemID = [157298399,157298399]
        const trackRecord= [
            {id: assignedProblemID[0],verdict:"OK"},
            {id: assignedProblemID[1],verdict:"TIME_LIMIT_EXCEEDED"},
            
            //other random submisisons
            {id:157298311,verdict:"TIME_LIMIT_EXCEEDED"},
        ]

        const finishedTask = await checkFinishedTask(assignedProblemID,trackRecord)
        
        expect(finishedTask.length).toBe(assignedProblemID.length);
        finishedTask.forEach((submission,index) =>{
            expect(assignedProblemID).toContain(submission.contestId),
            expect(submission).toHaveProperty("verdict")
        })
    }) 
    test("finishedTask, not all assigned tasks is finished, return only finished task ",async()=>{
        const assignedProblemID = [157298399,157298399]
        const trackRecord= [
            {id: assignedProblemID[0],verdict:"OK"},
            {id:157298311,verdict:"TIME_LIMIT_EXCEEDED"},
        ]

        const finishedTask = await checkFinishedTask(assignedProblemID,trackRecord)
        
        expect(finishedTask.length).toBe(1);
        finishedTask.forEach((submission,index) =>{
            expect(assignedProblemID).toContain(submission.contestId),
            expect(submission).toHaveProperty("verdict")
        })
    }) 
    test("finishedTask, not assinged tasks are finished, return [] ",async()=>{
        const assignedProblemID = [157298399,157298399]
        const trackRecord= [
            {id:11111111,verdict:"OK"},
            {id:22222222,verdict:"TIME_LIMIT_EXCEEDED"},
        ]

        const finishedTask = await checkFinishedTask(assignedProblemID,trackRecord)
        
        expect(finishedTask.length).toBe(0);

    })
    test("finishedTask, no tasks are assigned, return [] ",async()=>{
        const assignedProblemID = []
        const trackRecord= [
            {id:11111111,verdict:"OK"},
            {id:22222222,verdict:"TIME_LIMIT_EXCEEDED"},
        ]

        const finishedTask = await checkFinishedTask(assignedProblemID,trackRecord)
        
        expect(finishedTask.length).toBe(0);

    })
    test("finishedTask, tasks are assigned but no user has no trackRecord, return [] ",async()=>{
        const assignedProblemID = [157298399,157298399]
        const trackRecord= []

        const finishedTask = await checkFinishedTask(assignedProblemID,trackRecord)
        
        expect(finishedTask.length).toBe(0);

    })



    test("handler == null returns error",async()=>{
        await expect(retrieveTrackRecordStub(null)).rejects.toThrowError()
        
    }) 
})



describe.only("generate assignments",()=>{

interface ProblemSet{
    contestId: number
    rating?:number
}

test("filter problemSet based on index, return maximum 5 problems with selected index",async()=>{
        let userRating1: number = 1000
        let userRating2: number = 1099
        
        let sampleProblems: ProblemSet[] = [
            {contestId: 1, rating: 999},
            {contestId: 2, rating: 1000},
            {contestId: 3, rating: 1200},
            {contestId: 4, rating: 1201},

        ]

        const fetchProblems = vi
        .spyOn(fetchProblemsModule,"fetchProblems")
        .mockResolvedValue(sampleProblems)

        let problems = await generateAssignments(userRating1);
        expect(problems.length).not.toBe(0);
        problems.forEach(problem => {
            expect(problem.rating).toBeGreaterThanOrEqual(1000)
            expect(problem.rating).toBeLessThanOrEqual(1200)
        })
        

        problems = await generateAssignments(userRating2);
        expect(problems.length).not.toBe(0);
        problems.forEach(problem => {
            expect(problem.rating).toBeGreaterThanOrEqual(1000)
            expect(problem.rating).toBeLessThanOrEqual(1200)
        })

        
    }) 
   
})

