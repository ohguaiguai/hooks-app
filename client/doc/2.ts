//import produce from "immer"
//let produce = require('immer');
//console.log(produce);
//老状态
const baseState = [
    {
        todo: "Learn typescript",
        done: true
    },
    {
        todo: "Try immer",
        done: false
    }
]
function produce(baseState: any, callback: any) {
    let draftState = JSON.parse(JSON.stringify(baseState));
    return callback(draftState);
}
console.log(baseState);
//我们会根据baseState生成draftState,就可以任意修改draftState.最后会根据draftState返回新状态
const nextState = produce(baseState, (draftState: any) => {
    draftState.push({ todo: "Tweet about it" })
    draftState[1].done = true
    return draftState;
})
console.log(nextState); console.log(nextState);
console.log(baseState === nextState);