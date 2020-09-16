const calculateDeadline = (minutes: number): string => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes() + minutes;
  const second = today.getSeconds();

  const deadlineStr = `${year}/${month}/${day} ${hour}:${minute}:${second}`;

  return deadlineStr;
};
export default calculateDeadline;
