document.addEventListener("DOMContentLoaded", function() {
    // Get the audio element and the play/stop button
    var audio = document.getElementById("backgroundMusic");
    var playStopButton = document.getElementById("playStopButton");

    // Verify that the elements are correctly targeted
    console.log("Audio element:", audio);
    console.log("Play/Stop button element:", playStopButton);

    // Set initial state
    var isPlaying = false;

    // Function to toggle play/pause
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playStopButton.textContent = "Play Music";
        } else {
            audio.play();
            playStopButton.textContent = "Stop";
        }
        isPlaying = !isPlaying;
    }

    // Event listener for the play/stop button
    if (playStopButton) {
        playStopButton.addEventListener("click", togglePlay);
    } else {
        console.error("Play/Stop button not found");
    }

    // Function to update date and time
    function updateDateTime() {
        var currentDate = new Date();
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        var formattedDateTime = currentDate.toLocaleString('en-US', options);
        document.getElementById('datetime').textContent = formattedDateTime;
    }

    // Update date and time every second
    setInterval(updateDateTime, 1000);
    // Call updateDateTime() initially to display date and time immediately
    updateDateTime();
});

// script.js

window.addEventListener('DOMContentLoaded', (event) => {
    var messageInput = document.getElementById('message');
    var charCount = document.getElementById('charCount');

    messageInput.addEventListener('input', function() {
        var maxLength = 500;
        var currentLength = messageInput.value.length;
        var remaining = maxLength - currentLength;
        charCount.textContent = remaining;
        if (remaining < 0) {
            charCount.classList.add('negative');
        } else {
            charCount.classList.remove('negative');
        }
    });

    function validateForm() {
        var message = messageInput.value;
        if (message.length > 500) {
            alert("Message length exceeds the limit of 500 characters.");
            return false;
        }
        return true;
    }
});

!function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0];
    if(!d.getElementById(id)){
        js=d.createElement(s);
        js.id=id;
        js.src='https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js,fjs);
    }
}(document,'script','weatherwidget-io-js');

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        var returnToTopButton = document.getElementById('return-to-top');

        if (scrollPosition > 300) {
            returnToTopButton.style.display = 'block';
        } else {
            returnToTopButton.style.display = 'none';
        }
    });

    document.getElementById('return-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

