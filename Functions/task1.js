/*Մշակել curry ֆունկցիան, որն իբրև պարամետր ստանում է ցանկացած pure function և վերադարձնում դրա curied տարբերակը
օրինակ՝
const sum = (a,b,c) => a + b + c
const product = (a,b,c,d) => a * b * c * d

const sumFunc = curry(sum)
const prodFunc = curry(product)

console.log(sumFunc(1)(2,3)) //6
console.log(sumFunc(1,2)(3)) //6
console.log(sumFunc(1,2,3))   //6
console.log(prodFunc(1,2,3,4))   //24
console.log(prodFunc(1)(2,3,4))   //24
console.log(prodFunc(1,2)(3,4))   //24
console.log(prodFunc(1,2,3)(4))   //24
*/

function curry(fn){
    return function curried(...args){
        //ete bavarar argument havakel e 
        if(args.length >= fn.length){
            return fn(... args);
    }

    // ete argument chbavakanecni kkanchiays function
    return function(...args2){
        return curried(...args,...args2);
}
    
    }
}
// Example usage:
const sum = (a, b, c) => a + b + c;
const product = (a, b, c, d) => a * b * c * d;
const sumFunc = curry(sum);
const prodFunc = curry(product); 

 console.log(sumFunc(1)(2,3)) //6
console.log(sumFunc(1,2)(3)) //6
console.log(sumFunc(1,2,3))   //6
console.log(prodFunc(1,2,3,4))   //24
console.log(prodFunc(1)(2,3,4))   //24
console.log(prodFunc(1,2)(3,4))   //24
console.log(prodFunc(1,2,3)(4))   //24
