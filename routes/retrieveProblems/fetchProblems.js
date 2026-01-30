export async function fetchProblems(){
    const res = await fetch("https://codeforces.com/api/problemset.problems")
    const data = await res.json()
    console.log(data.result.problems)
    return data.result.problems
    
}

