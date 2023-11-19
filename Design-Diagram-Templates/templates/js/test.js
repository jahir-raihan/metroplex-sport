function getDifferenceInMinutes(date1, date2) {
    // Convert dates to milliseconds
    const time1 = date1.getTime();
    const time2 = date2.getTime();
  
    // Calculate the difference in milliseconds
    const timeDifference = time2 - time1;
  
    // Convert milliseconds to minutes
    const minutesDifference = timeDifference / (1000 * 60);
  
    // Round to the nearest whole minute
    const roundedMinutesDifference = Math.round(minutesDifference);
  
    // Return the difference in minutes
    return roundedMinutesDifference;
  }
  
  // Example usage
  const date1 = new Date('2023-11-18T21:00:00');
  const date2 = new Date('2023-11-18T22:15:00');
  
  const minutesDifference = getDifferenceInMinutes(date1, date2);
  console.log(`The difference in minutes between ${date1} and ${date2} is ${minutesDifference} minutes.`);