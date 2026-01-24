import { describe,test,expect } from "vitest";
import { retrieveHandler, retrieveProblems, retrieveTrack, retrieveTrackRecord } from "./retrieveProblems";
import request from 'supertest';
import sampleProblems from "./SampleProblems.json"

describe("retrieveTrackRecord()",()=>{
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
    test("handler === string returns 5 problemId and its verdict",async()=>{
        const record = await retrieveTrackRecord("anyString")
        
        expect(record.length).toBe(5);
        record.forEach(submission =>{
            expect(submission).toHaveProperty("id"),
            expect(submission).toHaveProperty("verdict")
        })
    }) 
    test("handler == null returns error",async()=>{
        await expect(retrieveTrackRecord(null)).rejects.toThrowError()
        
    }) 
})
describe("retrieveProblems()",()=>{
    /* 
        pre-condition:
        - index === string, index !=null

        post-condition
        - return (5 problemsets id and difficulty level with the selected difficulty)

        TODO:
        - upgrade this feature so that we can also retrieve problems based on multiple difficulties.
        currently, we can only retrieve problem based on one difficulty
        - Here, i assume that we'll retrieve problems only based on difficulty index,
        and hasn't take into account scenario where we retrieve problems based on tags.
        This assumption need to be fixed later
    */
    test("if index===string, return 5 problems sets",async()=>{
        const index = "anyIndex";
        const problems = await retrieveProblems(index);
        expect(problems.length).toBe(5);
        problems.forEach(problem => {
            expect(problem).toHaveProperty("index");
            expect(problem).toHaveProperty("id");
        });
    }) 
    test("if index is an array return error",async()=>{
        const indexes = ["index1","index2"];
        await expect(retrieveProblems(indexes)).rejects.toThrowError()
    }) 
    test("if index is null, return error",async()=>{
        const index = null;
        await expect(retrieveProblems(index)).rejects.toThrowError()
    }) 
    
    
})
