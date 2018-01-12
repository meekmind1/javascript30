const dogs = [{ name: "Snickers", age: 2 }, { name: "Hugo", age: 8 }];

function makeGreen() {
  const p = document.querySelector("p");
  p.style.color = "#BADA55";
  p.style.fontSize = "50px";
}

// Regular
console.log("Hello");

// Interpolated
console.log("Hello I am a %s string!", "💩");

// Styled
console.log(
  "%cI am some great text",
  "font-size: 50px; background: red; text-shadow: 1px 1px 0 white;"
);

// warning!
console.warn("OH NO!");

// Error :|
console.error("🐛");

// Info
console.info("A flock of crows is known as a murder.");

// Testing
console.assert(makeGreen === true, "That is wrong!");

// clearing
// console.clear();

// Viewing DOM Elements
const p = document.querySelector("p");
console.dir(p);

// Grouping together
dogs.forEach(dog => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});

// counting
console.count("Tom");
console.count("Tom");
console.count("Bob");
console.count("Bob");
console.count("Tom");

// timing
console.time("fetching data");
fetch("https://api.github.com/users/tomodwyer")
  .then(data => data.json())
  .then(data => {
    console.timeEnd("fetching data");
    console.log(data);
  });

// Table
console.table(dogs);
