// Extend dayjs with advanced format plugin
dayjs.extend(window.dayjs_plugin_advancedFormat);

// Get the current date
const currentDate = dayjs();
// Display the current date on the page
$('#currentDay').text(currentDate.format('dddd, MMMM Do'));

// Set the start and finish time for the day
const workStartHour = 9;
const workEndHour = 17;
let dailyTasks;

// Retrieve tasks from localStorage
if ((dailyTasks = localStorage.getItem('dailyTasks'))) {
  dailyTasks = JSON.parse(dailyTasks);
} else {
  dailyTasks = {};
}
// Loop through each work hour block from start to finish
for (let i = workStartHour; i <= workEndHour; i++) {
    let hourLabel = dayjs().hour(i).format('hA');
    let hourStatus;

    if (currentDate.hour() < i) {
      hourStatus = 'future';
    } else if (currentDate.hour() > i) {
      hourStatus = 'past';
    } else {
      hourStatus = 'present';
    }

    let $timeBlock = $(`#${i}am`);

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

  // Update dailyTasks object and save into storage
  dailyTasks[index] = userInput;

  // Stringify and store into local storage
  const tasksData = JSON.stringify(dailyTasks);
  localStorage.setItem('dailyTasks', tasksData);

// Log dailyTasks object and localStorage
  console.log('dailyTasks:', dailyTasks);
  console.log('localStorage:', localStorage);
});

