import { ROLE } from '@/constants/org';
import { IUserRecordData, Transaction } from '@/types/data';

export function getMonthAndDate(timestamp) {
  let date = new Date(timestamp);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let time =
    (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) +
    ':' +
    (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes());
  let week = date.getDay();
  return {
    month,
    day,
    time,
    week,
  };
}

export function getColorByWord(colors, word) {
  let code = 0;
  for (let i in word) {
    code += word.charCodeAt(i);
  }
  return colors[code % colors.length];
}

export function formatDate(
  dateInput: string | number | Date,
  format = 'yyyy-MM-DD'
): string {
  const date = new Date(dateInput);

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

export const getRoleLabelByBalue = (value: number) => {
  return Object.entries(ROLE).find(([_, val]) => val === value)?.[0] || '';
};

export const getTagTypeByRole = (role: ROLE) => {
  switch (role) {
    case ROLE.Owner:
      return 'danger';
    case ROLE.Admin:
      return 'warning';
    default:
      return 'info';
  }
};

export const balancePayment = (users: IUserRecordData): Transaction[] => {
  let totalCost = users.reduce((acc, currentUser) => acc + currentUser.cost, 0);

  let averageCost = totalCost / users.length;

  let payers = users
    .filter((user) => user.cost < averageCost)
    .sort((a, b) => a.cost - b.cost);
  let receivers = users
    .filter((user) => user.cost > averageCost)
    .sort((a, b) => b.cost - a.cost);

  let transactions: Transaction[] = [];

  while (payers.length > 0 && receivers.length > 0) {
    let currentPayer = payers[0];
    let currentReceiver = receivers[0];

    let transactionCost = Math.min(
      averageCost - currentPayer.cost,
      currentReceiver.cost - averageCost
    );

    if (transactionCost >= 0.01) {
      transactions.push({
        from: currentPayer.name,
        to: currentReceiver.name,
        cost: transactionCost,
      });
    }

    currentPayer.cost += transactionCost;
    currentReceiver.cost -= transactionCost;

    if (currentPayer.cost === averageCost) {
      payers.shift();
    }

    if (currentReceiver.cost === averageCost) {
      receivers.shift();
    }
  }

  return transactions;
};

export function friendlyTimeDisplay(input: string | Date | number): string {
  let date: Date;

  if (input instanceof Date) {
    date = input;
  } else if (typeof input === 'number') {
    date = new Date(input);
  } else {
    date = new Date(input);
  }

  const now = Date.now();
  const diff = (now - date.getTime()) / 1000; // 差距的秒数

  console.log(diff);

  if (diff < 60) {
    return '刚刚';
  }

  const diffMinutes = diff / 60;
  if (diffMinutes < 60) {
    return `${Math.floor(diffMinutes)}分钟前`;
  }

  const diffHours = diffMinutes / 60;
  if (diffHours < 24) {
    return `${Math.floor(diffHours)}小时前`;
  }

  const diffDays = diffHours / 24;
  if (diffDays < 365) {
    return (
      date.toISOString().substring(5, 10) +
      ' ' +
      ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]
    );
  }

  return formatDate(date, 'yyyy-MM-DD HH:mm:');
}
