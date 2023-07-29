const nameRegEx = RegExp('^[w](?!.*?.{2})[w.]{1,28}[w]$');
const passwordRegEx = RegExp('(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$');

test('name regex', async () => {
  const reg = '^[\\w](?!.*?\\.{2})[\\w.]{1,28}[\\w]$';
  console.log(reg);
  const regex = new RegExp(reg)
  console.log(regex);
});

test('password regex', async () => {});
