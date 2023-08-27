export function getMonthAndDate(timestamp) {
  let date = new Date(timestamp);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let time = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes());
  let week = date.getDay();
  return {
    month,
    day,
    time,
    week
  }
}

export function getColorByWord(colors, word) {
  let code = 0;
  for (let i in word) {
    code += word.charCodeAt(i);
  }
  return colors[code % colors.length]
}

export function formatDate(dateInput, format = 'yyyy-MM-DD') {
  const date = new Date(dateInput);

  if (isNaN(date)) {
    throw new Error('Invalid date');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formatTokens = {
    yyyy: year,
    MM: month,
    DD: day,
    HH: hours,
    mm: minutes,
    ss: seconds,
  };

  let formattedDate = format;

  for (const token in formatTokens) {
    formattedDate = formattedDate.replace(token, formatTokens[token]);
  }

  return formattedDate;
}

// 用于计算实现AA制的最小步骤
export const settlePayments = (payments) => {
  let total = 0;
  for(let name in payments){
      if(payments.hasOwnProperty(name))
        total += payments[name];
  }
  const avg = total / Object.keys(payments).length;

  const debts = {};
  for(let name in payments){
      if(payments.hasOwnProperty(name))
        debts[name] = payments[name] - avg;
  }

  const transactions = [];

  while(true){
      let maxDebt = -Infinity, maxDebtName = null;
      let minDebt = Infinity, minDebtName = null;

      for(let name in debts){
          if(debts.hasOwnProperty(name)) {
              if(debts[name] > maxDebt){
                  maxDebt = debts[name];
                  maxDebtName = name;
              }

              if(debts[name] < minDebt){
                  minDebt = debts[name];
                  minDebtName = name;
              }
          }
      }

      if(maxDebt <= 0){
          break;
      }

      const amount = Math.min(maxDebt, -minDebt);

      debts[maxDebtName] -= amount;
      debts[minDebtName] += amount;

      transactions.push({from: minDebtName, to: maxDebtName, amount: amount});
  }

  return transactions;
}
