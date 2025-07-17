export const getRandomCode = () => {
  const code = [];
  for (let i = 0; i < 4; i++) {
    code.push(Math.floor(Math.random() * 9));
  }
  console.log('🚀 ~ file: index.ts ~ line 6 ~ ', code);
  return code.join(''); // 使用空字符串连接
};
