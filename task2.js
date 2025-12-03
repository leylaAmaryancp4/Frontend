/* Գրել memoize կոչվող Higher Order Function-ը, որն իբրև պարամետր ստանում է pure function և վերադարձնում է դրա memoize արված տարբերակը
օրինակ՝
const foo = memoize(factorial) // ենթադրում ենք, որ factorial-ը նկարագրված է
console.log(foo(5)) // hաշվում է 120
console.log(foo(5)) // վերադարձնում է 120 cache-ից
*/
function memoize(fn){
    let  cache = {};
    return function(...args){
        
        if(args in cache){
            return cache[args];
}else{
    let result  = fn(...args);
    return result;

}
    }
}

const factorial = (n)=>{
    if(n === 0 || n === 1){
        return 1;
    }
    return n * factorial(n - 1);
}

    const foo = memoize(factorial)  
console.log(foo(5)) 
console.log(foo(5)) 