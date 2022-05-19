export const countScore = (text: string) => {
  const regExp = /([^<@\>]+(?=>))|(:apple:)/g;

  const matchedWords = text.match(regExp);

  if (matchedWords) {
    const newObject: any = {};
    let currentCount = 0;
    for (let i = matchedWords.length - 1; i >= 0; i--) {
      if (matchedWords[i] === ":apple:") {
        currentCount++;
      } else {
        if (matchedWords[i - 1] != ":apple:") {
          if (matchedWords[i] in newObject) {
            newObject[matchedWords[i]] += currentCount;
          } else {
            newObject[matchedWords[i]] = currentCount;
          }
        } else {
          if (matchedWords[i] in newObject) {
            newObject[matchedWords[i]] += currentCount;
          } else {
            newObject[matchedWords[i]] = currentCount;
          }
          currentCount = 0;
        }
      }
    }
    return newObject;
  }
  return {};
};
