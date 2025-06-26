const CountDaysLeft = (date) => {
  console.log("Group Date: ", date);
  const targetDate = new Date("2025-5-20");
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diff = targetDate - currentDate;

  // Convert to days
  const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
  console.log("Days Left To Start: ", daysLeft);
  return daysLeft;
};

export default CountDaysLeft;
