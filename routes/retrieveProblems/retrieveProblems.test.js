import { describe,test,expect, vi } from "vitest";
import { checkFinishedTask, retrieveHandlerStub, retrieveProblemsStub, retrieveTrack, retrieveTrackRecordStub } from "./retrieveProblems";
import request from 'supertest';
import sampleProblems from "./SampleProblems.json"
import * as fetchProblemsModule from "./fetchProblems.js"
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
describe("retrieveProblems()",()=>{
    test("if index===string, return problems sets (if doesn't exist return [])",async()=>{
        const index = "anyIndex";
        const problems = await retrieveProblemsStub(index);
        problems.forEach(problem => {
            expect(problem).toHaveProperty("index");
            expect(problem).toHaveProperty("id");
        });
    }) 
    test("if index is an array return error",async()=>{
        const indexes = ["index1","index2"];
        await expect(retrieveProblemsStub(indexes)).rejects.toThrowError()
    }) 
    test("if index is null, return error",async()=>{
        const index = null;
        await expect(retrieveProblemsStub(index)).rejects.toThrowError()
    }) 
    test("filter problemSet based on index, return maximum 5 problems with selected index",async()=>{
        const sampleProblems = [
            {contestId: 1, index: "B"},
            {contestId: 2, index: "A"},
            {contestId: 3, index: "A"},
            {contestId: 4, index: "A"},
            {contestId: 5, index: "A"},
            {contestId: 6, index: "A"},
            {contestId: 7, index: "A"}
        ]
        const fetchProblems = vi
        .spyOn(fetchProblemsModule,"fetchProblems")
        .mockResolvedValue(sampleProblems)

        const index = "A";
        const problems = await retrieveProblemsStub(index);
        expect(problems.length).toBe(5);
        problems.forEach(problem => {
            expect(problem.index).toBe("A")
        });
        
    }) 
    test("if index = x , return only difficulty level x dataset",async()=>{
        const sampleProblems = [
            {contestId: 1, index: "A"},
            {contestId: 2, index: "A"},
            {contestId: 3, index: "A"},
        ]
        const fetchProblems = vi
        .spyOn(fetchProblemsModule,"fetchProblems")
        .mockResolvedValue(sampleProblems)

        const index = "A";
        const problems = await retrieveProblemsStub(index);
        expect(problems.length).toBe(3);
        problems.forEach(problem => {
            expect(problem.index).toBe("A")
        });

    }) 
    test("if no problem set is returned, return []",async()=>{
        const index = "nonExistentIndex";
        const problems = await retrieveProblemsStub(index);
        expect(problems).toEqual([]);

    }) 
    
    
})

