export const generator = (length: number) => {
  return [...new Array(length)].map((_, index) => {
    const num = index + 1;

    return {
      title: `Random title ${num}`,
      imgUrl: 'https://miro.medium.com/max/1400/0*U8c0L1SgpAvDMBA6',
      description: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
    }
  });
};
