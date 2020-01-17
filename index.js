$(document).ready(function () {

    // configure screens
    $(".loginSection").show();
    $(".searchSection").hide();
    $(".searchSection__articles").hide();
    $(".searchSection__articles--invalid").hide();
    $(".searchSection__main--invalid").hide();

    // register event handlers
    $(".login__confirmButton").click(handleLogin);
    $(".search__button").click(handleSearch);

});

function handleLogin() {
    const username = $('.login__username').val();
    const password = $('.login__password').val();
    $.get({
        url: "https://sandbox-api.ipool.asideas.de/sandbox/api/search?q=test",
        success: function () {
            $(".login").removeClass("login--invalid");
            $(".login__username").removeClass('login__username--invalid');
            $(".login__password").removeClass('login__password--invalid');
            $(".login__confirmButton").removeClass('login__confirmButton--invalid');
            $(".header").removeClass('header--invalid');
            $(".footer").removeClass('footer--invalid');
            $(".login").fadeOut(function () {
                $(".searchSection").show();
            });
        },
        statusCode: {
            401: function () {
                $(".login").addClass('login--invalid');
                $(".header").addClass('header--invalid');
                $(".footer").addClass('footer--invalid');
                $(".login__username").addClass('login__username--invalid');
                $(".login__password").addClass('login__password--invalid');
                $(".login__confirmButton").addClass('login__confirmButton--invalid');
                $(".login__username").val('');
                $(".login__password").val('');
            }
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        }
    });
}

function handleSearch() {
    var searchLimit = $('.search__limit').val();
    const searchWords = $('.search__bar').val();
    const username = $('.login__username').val();
    const password = $('.login__password').val();

    $(".searchSection__articles").remove();
    $(".searchSection__articles--invalid").hide();
    $(".searchSection__main--invalid").hide();

    $.get({
        url: "https://sandbox-api.ipool.asideas.de/sandbox/api/search?q=" + encodeURI(searchWords) + "&limit=" + searchLimit,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
        success: function (data) {
            if (data.pagination.total != 0) {
                if (searchLimit > 99) {
                    searchLimit = 99
                }
                for (i = 0; i < searchLimit; i++) {
                    $("<article>" + "<header>" + "<H3>" + data.documents[i].title + "</H3>" + "</header>" + "<main>" + data.documents[i].content + "</main>" + "<footer>" + "<a href =" + data.documents[i].url + ">Go to the Website to read the full article" + "</a>" + "</footer>" + "</article>").appendTo(".searchSection").attr({
                        class: "searchSection__articles"
                    })
                    $("header").attr({
                        class: "searchSection__header"
                    })
                    $("main").attr({
                        class: "searchSection__main"
                    })
                    $("footer").attr({
                        class: "searchSection__footer"
                    })
                }
                searchIndicator();
            } else {
                errorMessage();
            }
        },
        statusCode: {
            400: function () {
                errorMessage();
            },
            401: function () {
                errorMessage();
            },
            500: function () {
                errorMessage();
            }
        }
    });
}

function errorMessage() {
    $(".search__bar").addClass('search__bar--invalid');
    $(".search__button").addClass('search__button--invalid');
    $(".search__limit").addClass('search__limit--invalid');
    $(".searchSection__articles--invalid").show();
    $(".searchSection__main--invalid").show();
    $(".header").addClass('header--invalid');
    $(".footer").addClass('footer--invalid');
    setTimeout(function () {
        $(".search__bar").removeClass('search__bar--invalid');
        $(".search__button").removeClass('search__button--invalid');
        $(".search__limit").removeClass('search__limit--invalid');
        $(".header").removeClass('header--invalid');
        $(".footer").removeClass('footer--invalid');
        $(".search__bar").val('');
    }, 1000);

}

function searchIndicator() {
    $(".search__button").addClass('search__button--active');
    $(".search__limit").addClass('search__limit--active');
    $(".header").addClass('header--active');
    $(".footer").addClass('footer--active');
    setTimeout(function () {
        $(".search__button").removeClass('search__button--active');
        $(".search__limit").removeClass('search__limit--active');
        $(".header").removeClass('header--active');
        $(".footer").removeClass('footer--active');
        $(".search__bar").val('');
    }, 1000);
}