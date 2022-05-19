export const countScore = (text: string) => {
  const regExp = /([^<@\>]+(?=>))|(:apple:)/g;

  // Получаем массив только с именами и яблоками
  const matchedWords = text.match(regExp);

  if (matchedWords) {
    const newObject: any = {};
    let currentCount = 0;
    for (let i = matchedWords.length - 1; i >= 0; i--) {
      // Проверяем с вправа на лево, является ли элемент яблоком
      if (matchedWords[i] === ":apple:") {
        currentCount++;
      } else {
        // Проверяем не ялвяется ли следующий элемент яблоком
        if (matchedWords[i - 1] != ":apple:") {
          // Проверяем существет ли уже такое поле в объекте
          if (matchedWords[i] in newObject) {
            newObject[matchedWords[i]] += currentCount;
          } else {
            newObject[matchedWords[i]] = currentCount;
          }
        } else {
          // Так как следующий элемент яблоко - сохраняем значение в текущее поле и обнуляем счетчик
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
