// Helper function to get greeting message
exports.getGreetingMessage = (firstName, lastName) => {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return `${greeting} Mr. ${firstName} ${lastName}`;
};