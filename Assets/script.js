var currentMoment = moment();

$("#currentDay").text(currentMoment.format('LLLL'));

$(document).ready(function () {
    adjustBlockColors();
    renderEvents();
});

function adjustBlockColors() {
    var currentTime = currentMoment.hours();

    $(".input").each(function () {
        var blockTime = parseInt($(this).attr("id"));
        
        if (currentTime > blockTime) {
            $(this).removeClass("future present").addClass("past");
        } else if (currentTime < blockTime) {
            $(this).removeClass("past present").addClass("future");
        } else {
            $(this).removeClass("past future").addClass("present");
        }
    });
}

$(".saveBtn").click(function () {
    var eventText = $(this).siblings(".input").val();
    var eventTime = $(this).siblings(".hour").text();
    
    localStorage.setItem(eventTime, JSON.stringify(eventText));
    
    adjustBlockColors();
    renderEvents();
});

$(".deleteBtn").click(function () {
    $(this).siblings(".input").val("");
    var eventTime = $(this).siblings(".hour").text();
    localStorage.removeItem(eventTime);
    
    adjustBlockColors();
    renderEvents();
});

function renderEvents() {
    for (var i = 8; i <= 20; i++) {
        var blockTime = i + ":00 am";
        if (i >= 13) {
            blockTime = (i - 12) + ":00 pm";
        }

        var savedEvent = JSON.parse(localStorage.getItem(blockTime)) || "";
        $("#" + i).val(savedEvent);
    }
}