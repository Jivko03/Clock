const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let alarmTime = null;
let alarmAudio = null;

function updateTimeAndDate() {
    var currentDate = new Date();

    var month = monthNames[currentDate.getMonth()];
    var day = currentDate.getDate().toString().padStart(2, '0');
    var year = currentDate.getFullYear().toString();

    var hours = currentDate.getHours().toString().padStart(2, '0');
    var minutes = currentDate.getMinutes().toString().padStart(2, '0');
    var seconds = currentDate.getSeconds().toString().padStart(2, '0');

    document.getElementById('date').innerText = month + ' ' + day + ', ' + year;

    document.getElementById('hour1').src = `images/${hours.charAt(0)}.png`;
    document.getElementById('hour2').src = `images/${hours.charAt(1)}.png`;
    document.getElementById('minute1').src = `images/${minutes.charAt(0)}.png`;
    document.getElementById('minute2').src = `images/${minutes.charAt(1)}.png`;
    document.getElementById('second1').src = `images/${seconds.charAt(0)}.png`;
    document.getElementById('second2').src = `images/${seconds.charAt(1)}.png`;

    // Check if alarm should trigger
    if (alarmTime && `${hours}:${minutes}` === alarmTime) {
        if (document.getElementById('soundCheckbox').checked) {
            document.getElementById('alarmSound').play();
        }
        if (document.getElementById('vibrateCheckbox').checked && navigator.vibrate) {
            navigator.vibrate([500, 300, 500]);
        }
        document.getElementById('alarmStatus').innerText = 'Alarm ringing!';
        alarmTime = null; // Prevent re-triggering
    }
}

function setAlarm() {
    const inputTime = document.getElementById('alarmTime').value;
    const inputAudio = document.getElementById('alarmAudio').files[0];
    
    if (inputTime) {
        alarmTime = inputTime;
        
        if (inputAudio) {
            const audioUrl = URL.createObjectURL(inputAudio);
            document.getElementById('alarmSound').src = audioUrl;
        }
        
        document.getElementById('alarmStatus').innerText = `Alarm set for ${alarmTime}`;
        
        // Hide alarm settings, show only "Clear Alarm"
        document.getElementById('alarmOptions').style.display = 'none';
        document.getElementById('clearAlarmButton').style.display = 'inline-block';
    } else {
        alert('Please select a time for the alarm.');
    }
}

function deleteAlarm() {
    alarmTime = null;
    document.getElementById('alarmSound').pause();
    document.getElementById('alarmSound').currentTime = 0;
    document.getElementById('alarmStatus').innerText = 'Alarm deleted.';

    // Show alarm options again
    document.getElementById('alarmOptions').style.display = 'block';
    document.getElementById('clearAlarmButton').style.display = 'none';
}

setInterval(updateTimeAndDate, 1000);
updateTimeAndDate();
