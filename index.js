$(document).ready(function () {

    // configure screens
    $(".loginSection").show();
    $(".searchSection").hide();
    $(".searchSection__articles").hide();

    // register event handlers
    $(".login__confirmButton").click(handleLogin);
    $(".search__button").click(handleSearch);

});

function checkLogin(username, password) { 
    return (username == 123 && password == 123);
}

function handleLogin() {
    const username = $('.login__username').val();
    const password = $('.login__password').val();

    if (checkLogin(username, password)) {
        $(".login").removeClass("login--invalid");
        $(".login__username").removeClass('login__username--invalid');
        $(".login__password").removeClass('login__password--invalid');
        $(".login__confirmButton").removeClass('login__confirmButton--invalid');
        $("header").removeClass('header--invalid');
        $("footer").removeClass('footer--invalid');
        $(".login").fadeOut(function () {
            $(".searchSection").show();
        });
    } else {
        $(".login").addClass('login--invalid');
        $("header").addClass('header--invalid');
        $("footer").addClass('footer--invalid');
        $(".login__username").addClass('login__username--invalid');
        $(".login__password").addClass('login__password--invalid');
        $(".login__confirmButton").addClass('login__confirmButton--invalid');
        $(".login__username").val('');
        $(".login__password").val('');
    }
}

var randomtext = "In show dull give need so held. One order all scale sense her gay style wrote. Incommode our not one ourselves residence. Shall there whose those stand she end. So unaffected partiality indulgence dispatched to of celebrated remarkably. Unfeeling are had allowance own perceived abilities. Admiration stimulated cultivated reasonable be projection possession of. Real no near room ye bred sake if some. Is arranging furnished knowledge agreeable so. Fanny as smile up small. It vulgar chatty simple months turned oh at change of. Astonished set expression solicitude way admiration. Mind what no by kept. Celebrated no he decisively thoroughly. Our asked sex point her she seems. New plenty she horses parish design you. Stuff sight equal of my woody. Him children bringing goodness suitable she entirely put far daughter.";

function handleSearch() {
    $("<article>" + "<p>" + randomtext + "</p>" + "</article>").appendTo(".searchSection").attr({
        class: "searchSection__articles"
    });
    $(".search__button").addClass('search__button--active');
    $(".search__limit").addClass('search__limit--active');
    $("header").addClass('header--active');
    $("footer").addClass('footer--active');
    setTimeout(function () {
        $(".search__button").removeClass('search__button--active');
        $(".search__limit").removeClass('search__limit--active');
        $("header").removeClass('header--active');
        $("footer").removeClass('footer--active');
        $(".search__bar").val('');
    }, 1000);
}