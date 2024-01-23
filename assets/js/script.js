dayjs.extend(window.dayjs_plugin_advancedFormat)
const currentDate = dayjs();


$('#currentDay').text(currentDate.format('dddd, MMMM Do'));
