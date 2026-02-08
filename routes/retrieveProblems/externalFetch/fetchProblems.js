import { type } from "node:os"

export async function fetchProblems(){
    const res = await fetch("https://codeforces.com/api/problemset.problems")
    const data = await res.json()
    console.log(data.result.problems)
    return data.result.problems
    
}
export async function fetchUserRating(userHandler){
    if (typeof userHandler !=="string") {
        throw new Error("userHandler must be a string");
    }
    const res = await fetch(`https://codeforces.com/api/user.info?handles=${userHandler}`)
    const data = await res.json()
    return data.result[0].rating
    
}
export async function saveAssignments(assignments){

}



