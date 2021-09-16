const person = {
   name: "Max",
   age: 29,
   greet() {
      console.log('Hi, I am ' + this.name);
   }
};

const coppiedPerson = {...person};
console.log(coppiedPerson);

const hobbies = ['Sports', 'Cooking'];
// for (let hobby of hobbies) {
//   console.log(hobby);
// }

// console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
// console.log(hobbies);
const coppiedArray = [...hobbies];
console.log(coppiedArray);

const toArray = (...args) => {
   return args;
};

console.log(toArray(1, 2, 3, 4));