/*գրել trace HOF-ը, որն իբրև պարամետր ստանում է pure function և վերադարձնում է նոր ֆունկցիա, 
որը բացի հիմնական ֆունկցիան իրականացնելիս
 նաև history օբյեկտում պահում է ֆունկցիայի կանչերի պատմությունը
օրինակ՝
function foo(a,b){
   return a + b
} 

const tracedFunc = trace(foo)
console.log(tracedFunc(1,2)) //3
console.log(tracedFunc(2,4,6)) //6

console.log(tracedFunc.history) //[{args:[1,2], output: 3}, {args:[2,4], output:6}}]
*/

function trace(fn){
    function traced(...args){
        let result = fn(...args);
        traced.history.push({
            args:args,
            output:result
        })
        return result;
    }
    traced.history = [];
    return traced;

}

function foo(a,b){
   return a + b
} 

const tracedFunc = trace(foo)
console.log(tracedFunc(1,2)) 
console.log(tracedFunc(2,4,6)) 
console.log(tracedFunc.history) 

