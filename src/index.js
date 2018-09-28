module.exports = function check(str, bracketsConfig) {
  const strSIZE = str.length;
  const stack = [];
  const bracket = {}
  const type = (item) => {
    const bracketsConfigSIZE = bracketsConfig.length;
    for(let i = 0; i < bracketsConfigSIZE; i++){
      if(bracketsConfig[i].includes(item)) return bracketsConfig[i];
    }
    return 1;
  }
  for(let i = 0; i < strSIZE; i++){
    bracket.current = str[i];
    bracket.inStack = bracket.current === stack[0];
    bracket.pair = type(bracket.current);
    bracket.twin = bracket.pair[0] === bracket.pair[1];
    bracket.closing = bracket.current === bracket.pair[1];
    bracket.opening = bracket.current === bracket.pair[0];
    bracket.match = bracket.pair[0] === stack[0];
    
    if(bracket.opening && bracket.twin && bracket.inStack){
      stack.shift();
      continue;
    }
    if(bracket.opening && bracket.twin && !bracket.inStack){
      stack.unshift(bracket.current);
      continue;
    }
    if(bracket.opening && !bracket.twin){
      stack.unshift(bracket.current);
      continue;
    }
    if(bracket.closing && !bracket.twin && bracket.match){
      stack.shift();
      continue;
    }
    if(bracket.closing && !bracket.twin && !bracket.match){
      return false;
    }
  }
  return stack.length ? 0:1;
}
