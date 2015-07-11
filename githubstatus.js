$(document).ready(function () {

    getGithubStatus();

    getLastMessage();

    getMessagesList();

});

function getGithubStatus() {
    var urlStatus = "https://status.github.com/api/status.json";

    $.ajax({
        url: urlStatus,
        type: 'GET',
        timeout: 6000,
        dataType: 'jsonp',
        cache: false,
        async: true,
    }).done(function (data) {

        $('#status').html(data.status);

        switch (data.status) {
            case "good":
                $('#status').toggleClass("statusGood");
                break;
            case "minor":
                $('#status').toggleClass("statusMinor");
                break;
            case "major":
                $('#status').toggleClass("statusMajor");
                break;
        }

        $('#lastMessage').html(data.message);

        var lastupdated = data.last_updated;
        var momentDate = moment(lastupdated);

        $('#lastUpdated').html(momentDate.fromNow());

    }).fail(function (xhr) {

    });
}

function getLastMessage() {
    var urlLastHumanMessage = "https://status.github.com/api/last-message.json";

    $.ajax({
        url: urlLastHumanMessage,
        type: 'GET',
        timeout: 6000,
        dataType: 'jsonp',
        cache: false,
        async: true,
    }).done(function (data) {

        $('#lastHumanMessageStatus').html(data.status);

        switch (data.status) {
            case "good":
                $('#lastHumanMessageStatus').toggleClass("statusGood");
                break;
            case "minor":
                $('#lastHumanMessageStatus').toggleClass("statusMinor");
                break;
            case "major":
                $('#lastHumanMessageStatus').toggleClass("statusMajor");
                break;
        }

        $('#lastHumanMessage').html(data.body);

        var lastupdated = data.created_on;
        var momentDate = moment(lastupdated);

        $('#lastHumanMessageUpdated').html(momentDate.fromNow());

    }).fail(function (xhr) {

    });
}

function getMessagesList() {
    var urlLastHumanMessages = "https://status.github.com/api/messages.json";

    $.ajax({
        url: urlLastHumanMessages,
        type: 'GET',
        timeout: 6000,
        dataType: 'jsonp',
        cache: false,
        async: true,
    }).done(function (data) {

        var i = 0;
        var out = "";
        var statusClass = "";

        $.each(data, function (i, item) {

            switch (item.status) {
                case "good":
                    statusClass = "success";
                    break;
                case "minor":
                    statusClass = "warning";
                    break;
                case "major":
                    statusClass = "danger";
                    break;
            }

            var momentDate = moment(item.created_on);

            var localTime = moment.utc(item.created_on).toDate();
            localTime = moment(localTime).format('YYYY-MM-DD - HH:mm:ss');

            out += "<tr class='" + statusClass + "'><td>" +
            item.status +
            "</td><td class='col-xs-6'>" +
            item.body +
            "</td><td class='col-xs-4'>" +
            localTime +
            "</td></tr>";
        });

        $('#tableMessages').html(out);

    }).fail(function (xhr) {

    });
}