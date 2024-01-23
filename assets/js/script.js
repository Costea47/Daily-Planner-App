// Extend dayjs with advanced format plugin
dayjs.extend(window.dayjs_plugin_advancedFormat);

// Get the current date using dayjs
const currentDate = dayjs();
// Display the current date on the page
$('#currentDay').text(currentDate.format('dddd, MMMM Do'));

// Set the start and finish time for the day
const workStartHour = 9;
const workEndHour = 17;
// Declare variable to store daily tasks
let dailyTasks;

// Retrieve tasks from localStorage
if ((dailyTasks = localStorage.getItem('dailyTasks'))) {
  // Parse JSON data if tasks exist in local storage
  dailyTasks = JSON.parse(dailyTasks);
} else {
   // Initialize an empty object for daily tasks if no tasks are found in local storage
  dailyTasks = {};
}
// Loop through each work hour block from start to finish
for (let i = workStartHour; i <= workEndHour; i++) {
  // Get the formatted label for the current hour
    let hourLabel = dayjs().hour(i).format('hA');
    // Determine the status of the hour (past, present, or future) based on the current time
    let hourStatus;

    if (currentDate.hour() < i) {
      hourStatus = 'future';
    } else if (currentDate.hour() > i) {
      hourStatus = 'past';
    } else {
      hourStatus = 'present';
    }
    // Get the jQuery element for the current hour block
    let $timeBlock = $(`#${i}am`);

    // Check if the time block already exists
    if ($timeBlock.length > 0) {
        // Time block already exists, update its content and apply color-coding
        $timeBlock.find('.hour').text(hourLabel);
        $timeBlock.find('.description').val(dailyTasks[`${i}am`] || '');
        $timeBlock.removeClass('past present future').addClass(hourStatus);
    }
}

// Event listener for save button click
$('.saveBtn').on('click', function () {
  console.log('Save button clicked');

  // Get input and index
  const textArea = $(this).prev();
  const userInput = textArea.val();
  const index = textArea.parent().attr('id'); // Use the parent ID as the index

  // Return if no change was detected
  if (userInput === dailyTasks[index]) return;

  // Update dailyTasks object with user input and save into local storage
  dailyTasks[index] = userInput;

   // Stringify and store dailyTasks into local storage
  const tasksData = JSON.stringify(dailyTasks);
  localStorage.setItem('dailyTasks', tasksData);

// Log updated dailyTasks object and current state of local storage
  console.log('dailyTasks:', dailyTasks);
  console.log('localStorage:', localStorage);
});

