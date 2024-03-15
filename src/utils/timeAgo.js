// Function to calculate the time elapsed since a given timestamp
export const timeAgo = (timestamp) => {
    // Get the current timestamp
	const now = Date.now();

    // Calculate the time difference in seconds
	const secondsAgo = Math.floor((now - timestamp) / 1000);

    // If the time difference is less than a minute, display seconds ago
	if (secondsAgo < 60) {
		return `${secondsAgo}s ago`;
	} 
    // If the time difference is less than an hour, display minutes ago
    else if (secondsAgo < 3600) {
		const minutesAgo = Math.floor(secondsAgo / 60);
		return `${minutesAgo}m ago`;
	} 
    // If the time difference is less than a day, display hours ago
    else if (secondsAgo < 86400) {
		const hoursAgo = Math.floor(secondsAgo / 3600);
		return `${hoursAgo}h ago`;
	} 
    // If the time difference is less than a week, display days ago
    else if (secondsAgo < 604800) {
		const daysAgo = Math.floor(secondsAgo / 86400);
		return `${daysAgo}d ago`;
	} 
    // If the time difference is a week or more, display weeks ago
    else {
		const weeksAgo = Math.floor(secondsAgo / 604800); // 7 days in seconds
		return `${weeksAgo}w ago`;
	}
};





// export const timeAgo = (timestamp) => {
// 	const now = Date.now();
// 	const secondsAgo = Math.floor((now - timestamp) / 1000);

// 	if (secondsAgo < 60) {
// 		return `${secondsAgo}s ago`;
// 	} else if (secondsAgo < 3600) {
// 		const minutesAgo = Math.floor(secondsAgo / 60);
// 		return `${minutesAgo}m ago`;
// 	} else if (secondsAgo < 86400) {
// 		const hoursAgo = Math.floor(secondsAgo / 3600);
// 		return `${hoursAgo}h ago`;
// 	} else if (secondsAgo < 604800) {
// 		const daysAgo = Math.floor(secondsAgo / 86400);
// 		return `${daysAgo}d ago`;
// 	} else {
// 		const weeksAgo = Math.floor(secondsAgo / 604800); // 7 days in seconds
// 		return `${weeksAgo}w ago`;
// 	}
// };