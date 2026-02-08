import { describe,test,expect, vi } from "vitest";
import { generateAssignments } from "./retrieveProblems";
import { fetchUserRating } from "./externalFetch/fetchProblems";

test("generate assignments for new students",async()=>{
    const problems = await generateAssignments(1405);
    problems.forEach(problem => {
        expect(problem.rating).toBeGreaterThanOrEqual(1400)
        expect(problem.rating).toBeLessThanOrEqual(1600)
    })
})
test("fetch user rating",async()=>{
    const userRating = await fetchUserRating("VALENZ");
    expect(userRating).toBe(1405)
})
