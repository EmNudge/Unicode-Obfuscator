const InitializerRegex = /(function|const|var|let)\s+(.+?)\P{ID_Continue}/gu;
const paramsRegex = /function\s+\p{ID_Continue}+\((.+?)\)/gu;

const getIndentRegex = (identifier) =>
  new RegExp(`(?<=\\P{ID_Continue})${identifier}(?=\\P{ID_Continue})`, 'gu');

const getVarName = (index) => 
  'ﾠ' + String.fromCodePoint(0xfe00).repeat(index);

// function* split()
function* combine(iters) {
  for (const iter of iters) yield* iter;
}
function* map(func, iter) {
  for (const item of iter) yield func(item);
}

export function transform(input) {
  let currText = input;

  let i = 0;

  const paramsIter = combine(map(match =>  match[1].split(/\s*,\s*/), input.matchAll(paramsRegex)));
  const varIter = map(match => match[2], input.matchAll(InitializerRegex));
  const matches = combine([paramsIter, varIter]);
  
  for (const varName of new Set(matches)) {
    const regex = getIndentRegex(varName);
    currText = currText.replace(regex, getVarName(i));
    i++;
  }

  return currText;
}