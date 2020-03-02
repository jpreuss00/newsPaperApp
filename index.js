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

    // switch focus on input field and confirm username and password from any input field
    $(".login__username").keydown(function (enterKey) {
        if (enterKey.keyCode == 13) {
            handleLogin();
        }
    })
    $(".login__password").keydown(function (enterKey) {
        if (enterKey.keyCode == 13) {
            handleLogin();
        }
    })
    $(".login__username").keydown(function (enteredKey) {
        if (enteredKey.keyCode == 40) {
            $('.login__password').focus()
        }
    })
    $(".login__password").keydown(function (enteredKey) {
        if (enteredKey.keyCode == 40) {
            $('.login__confirmButton').focus()
        } else if (enteredKey.keyCode == 38) {
            $('.login__username').focus()
        }
    })
    $(".login__confirmButton").keydown(function (enteredKey) {
        if (enteredKey.keyCode == 38) {
            $('.login__password').focus()
        }
    })

});

function handleLogin() {
    const username = $('.login__username').val();
    const password = $('.login__password').val();
    $.get({
        url: "https://sandbox-api.ipool.asideas.de/sandbox/api/search?q=test",
        success: function () {
            $(".login").removeClass('login--invalid');
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
        beforeSend: function (apiCredentials) {
            apiCredentials.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        }
    });
}

function newArticleTemplate(element) {
    return `<article class='searchSection__articles'><header class='searchSection__header'><h3>${element.title}</h3><h4>${element.dateCreated}</h4></header><main class ='searchSection__main'>${element.content}</main><footer class='searchSection__footer'><a target='_blank' href='${element.url}'>Go to the Website to read the full article</a></footer></article>`;
}

function appendArticlesToList(data) {

    var searchLimit = $('.search__limit').val();

    if (data.pagination.total != 0 && searchLimit > 0) {
        if (searchLimit > 99) {
            searchLimit = 99
        }
        for (i = 0; i < searchLimit; i++) {
            let element = data.documents[i];
            let template = newArticleTemplate(element);

            $(template).appendTo(".searchSection"),
                $("header").attr({
                    onclick: '$(this).closest(".searchSection__articles").remove()'
                })
        }
        searchIndicator();
    } else {
        errorMessage();
    }
}

function handleSearch() {

    const searchWords = $('.search__bar').val();

    $(".searchSection__articles").remove();
    $(".searchSection__articles--invalid").hide();
    $(".searchSection__main--invalid").hide();

    searchArticles(searchWords, appendArticlesToList);

    setTimeout(checkArticleAmount, 500);
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

function checkArticleAmount() {
    const limit = $('.search__limit').val();
    if ($('.searchSection__articles').length < limit) {
        const searchWords = $('.search__bar').val();
        searchArticles(searchWords, appendNewArticle);
    }
    setTimeout(checkArticleAmount, 1000);
}

var deletedArticles = 1;

function appendNewArticle(data) {
    var newArticleAmountCounter = Number($('.search__limit').val()) + deletedArticles;
    let element = data.documents[newArticleAmountCounter];
    let template = newArticleTemplate(element);
    $(template).appendTo(".searchSection"),
        $("header").attr({
            onclick: '$(this).closest(".searchSection__articles").remove()'
        })
    deletedArticles++;
}

function searchArticles(searchWords, callback) {
    $(".searchSection__articles--invalid").hide();
    $(".searchSection__main--invalid").hide();
    const username = $('.login__username').val();
    const password = $('.login__password').val();
    data = $.get({
        url: "https://sandbox-api.ipool.asideas.de/sandbox/api/search?q=" + encodeURI(searchWords) + "&limit=100",
        beforeSend: function (apiCredentials) {
            apiCredentials.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
        success: function (data) {
            callback(data);
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