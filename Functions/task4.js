 
/*մշակել pipe HOF-ը, որն իբրև պարամետր ստանում է ...fns (pure ֆունկցիաներ ) և 
վերադարձնում է նոր ֆունկցիա
նոր ֆունկցիան կանչելիս փոխանցված արգումենտը փոխանցվում է fns[0]-ին, 
որից ստացված արժեքը փոխանցվում է արդեն fns[1]-ին և այսպես շարունակ:
const add5 = a => a + 5
const double = a => 2 * a
const sub4 = a => a - 4

const func = pipe(add5, add5, double, sub4)
console.log(func(2)) //20

//բացատրություն

//2 -> add5(2) => 7
//7 -> add5(7) => 12
//12 -> double(12)=> 24
//sub4 -> sub4(24) => 20
*/

function pipe(...fns){
    return function(value){
        return fns.reduce((acc,fn)=>fn(acc),value);
    }
}

let add1 = a=> a + 5;
const double = a=> 2 * a;
const sub4 = a => a - 4;

const func = pipe(add1, double, sub4);
console.log(func(2))
