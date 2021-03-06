var task;

$(document).ready(function(){
  if ($('.task-in-progress').length > 0) {
    var inProgress = $(".task-in-progress");
    var taskID = inProgress.attr("id");
    var request = $.ajax({
      url: "/tasks/" + taskID,
      method: "get",
    }).done(function(response){
      task = response;
      getEachSecond();
    });
  }
});

function getEachSecond() {
     window.setTimeout(getEachSecond, 1000);

     calculateTime(task);
 }

 function calculateTime(response){
    var startTime = response.start_time;
    var timeBox = response.time_box;
    var now = new Date();
    var start = new Date(startTime);
    var currentTimeSeconds = Math.floor(((now - start)/1000));

    var timeBoxSeconds = (timeBox * 60);
    var percent = Math.floor(currentTimeSeconds / timeBoxSeconds * 100);

    var hours = Math.floor(currentTimeSeconds/3600);

    var minutes = Math.floor((currentTimeSeconds/60) % 60);

    var seconds = Math.floor(currentTimeSeconds % 60);

    var progressDifference = (currentTimeSeconds / 10);

    var progressBar = $(".progress-ticker");

    if (hours >= 10) {
      $(".hours").html(hours);
    } else if (hours > 0) {
      $(".hours").html('0' + hours);
    } else {
      $(".hours").html('00');
    }

    if (minutes >= 10) {
      $(".minutes").html(": " + minutes);
    } else if (minutes > 0) {
      $(".minutes").html(': 0' + minutes);
    } else {
      $(".minutes").html(': 00');
    }

    if (seconds >= 10) {
      $(".seconds").html(": " + seconds);
    } else if (seconds > 0) {
      $(".seconds").html(': 0' + seconds);
    } else {
      $(".seconds").html(': 00');
    }

    if (percent >= 100) {
      percent = 100;
      console.log(percent);
      progressBar.removeClass("progress-bar-active");
      progressBar.addClass("progress-bar-danger");
    }

    if (progressDifference < 100) {
      $(".progress-ticker").css("width", percent + "%");
      $(".progress-ticker").html(percent + "%");
    }
  }