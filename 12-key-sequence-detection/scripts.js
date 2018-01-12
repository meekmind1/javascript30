const pressed = [];
const secretCode = "tomodwyer";

window.addEventListener("keyup", e => {
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  if (pressed.join("").includes(secretCode)) {
    console.log("YOU DID IT!");
    cornify_add(); // eslint-disable-line no-undef
  }
});
