/* ==================== SKRYPTY GŁÓWNE STRONY ==================== */

jQuery(document).ready(function()
{
	console.log("jQuery: " + jQuery().jquery);

	var today = new Date();
	var today_dd = String(today.getDate()).padStart(2, '0');
	var today_mm = String(today.getMonth() + 1).padStart(2, '0'); // Styczeń jest 0!
	var today_yyyy = today.getFullYear();
	
	/* -------------------------------------------------- */

	$(window).on('load', function() {
		$('#wczytywanie').hide();
	});

/* -------------------------------------------------- */

	function wysokoscStrony(element)
	{
		element.css({
			'position': 'relative',
			'width': '100%',
			'height': window.innerHeight});
	};

	$(window).on('load resize', function() {
		wysokoscStrony($('.element_pelnej_strony'));
	});

/* -------------------------------------------------- */

	function losowanie_tła()
	{
    	var ile_losowac = liczba_tla;
    	var wylosowano = Math.ceil( Math.random() * ile_losowac );
    	
		$("background").css("background-image", 'url("../.img/backgrounds/' + wylosowano + '.jpg")');
    };

	var liczba_tla = 18;

	for ( var klucz = 1; klucz < liczba_tla; klucz++ )
		$("background").append('<preloader style="background-image: url(../.img/backgrounds/' + klucz + '.jpg);"></preloader>');

	losowanie_tła();

if ( !/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) )
{
	setInterval(function()
	    {
	        losowanie_tła();
	    }, 10000
	);
};


/* -------------------------------------------------- */


$("#pływające_okienko").find("iframe").on("load", function() {
	//window.history.pushState("iframe", "iFrame Get URL", $(this).contents().get(0).location.href); // To jest ujowe, bo user musi kilka razy klikać wstecz
	
	//window.history.replaceState("iframe", "iFrame Get URL", $(this).contents().get(0).location.href); // To działało ale to jest bez hasha, wyłączone odkąd używam hasha w adresie

	if ( $(this).contents().get(0).location.pathname != 'blank' )
	//	window.location.hash = $(this).contents().get(0).location.pathname; // Nie używam hasha, bo dziwnie się 'cofa' strony
		window.history.replaceState("iframe", "iFrame Get URL", '#' + $(this).contents().get(0).location.pathname); // Tutaj dodaje hasha po prostu do pathname, inny kod wyłapuje hasha i wczytuje stronę działa też cofanie

	$(document).on("click", function(event)
	{
		if ( !$(event.target).closest(".pływające_okienko-link").length ) // Nie do końca to rozumiem, ale działa :D
		{
			//pływające_okienko(); // zamykanie okna po kliknięciu po za nie - wyłączone, bo po co
		};
	
	});
});


function pływające_okienko(url)
{
	var pływające_okienko = $("#pływające_okienko");

	function pływające_okienko_zamykanie()
	{
		//console.log('Zamykanie okienka');
		pływające_okienko.find("iframe").attr("src", "");
		$("#linki").show();
        //$("#centrala").delay(750).fadeIn();
        $("#centrala").delay(750).removeClass("top_centrala");
		pływające_okienko.hide().removeClass("widoczne");
		window.history.replaceState("iframe", "iFrame Revert URL", "/");
	};

	if ( !pływające_okienko.hasClass("widoczne") && url != null ) // Nie może mieć klasy widoczne i nie może nie mieć url
	{
		//console.log('Otwieranie okienka');
        $("#linki").hide();
        // Centralka zostaje
        //$("#centrala").fadeOut();
        $("#centrala").addClass("top_centrala");
		pływające_okienko.toggle().addClass("widoczne");
		pływające_okienko.find("iframe").attr("src", url);
		pływające_okienko.find(".zamknij").on('click', function()
		{
			// if ( confirm('Confirm') ) // Nie wiem czemu ale to potrafi nie zawsze się zamknąć tak jakby wyskakiwało ich dziesiątki
				pływające_okienko_zamykanie();
		});
	}
	else
	{
		pływające_okienko_zamykanie();
	};



};


$(".pływające_okienko-link").click(function()
{
	pływające_okienko( $(this).find("a").attr("href") );
});


/* -------------------------------------------------- */

var hoverlinki = 'rgb(var(--kolor-unhover-linkow))';
var unhoverlinki = 'rgb(var(--kolor-linkow))';

$("#linki ol > li > label, #linki ul > li > label").hover(function()
{
	$(this).parent().parent().find('li').css('color', hoverlinki);
}, function()
{
	$(this).parent().parent().find('li').css('color', unhoverlinki);
});
/* Dzięki temu po najechaniu na linki reszta linków zmienia kolor - łapie tylko linki 1go rzędu */


$("#linki ol > li > ul > li > label, #linki ul > li > ul > li > label").hover(function()
{
	$(this).parent().parent().parent().parent().find('li').css('color', hoverlinki);
}, function()
{
	$(this).parent().parent().parent().parent().find('li').css('color', unhoverlinki);
});
/* Dzięki temu po najechaniu na linki reszta linków zmienia kolor - łapie tylko linki 2go rzędu */


/* -------------------------------------------------- */

$("#menu_pionowe ol > li > label").hover(function()
{
	$(this).parent().css('margin-left', "32px");
}, function()
{
	$(this).parent().css('margin-left', "16px");
});
/* To ma zmieniać marginesy linków tj. elementów listy z linkami - łapie tylko linki 1go rzędzu */

$("#menu_pionowe ol > li > ul > li > label").hover(function()
{
	$(this).parent().css('margin-left', "48px");
}, function()
{
	$(this).parent().css('margin-left', "32px");
});
/* To ma zmieniać marginesy linków tj. elementów listy z linkami - łapie tylko linki 2go rzędzu */

/* -------------------------------------------------- */


$(".down-list").append('<i class="fas fa-fw fa-angle-down"></i>');

$(".down-list").parent().find("ul").hide();

$(".down-list").click(function()
{
	$(this).parent().find("ul").slideToggle("fast");
	$(this).find("i.fa-angle-down").toggleClass("fa-angle-up");
});

/* To jest kodzik odpowiedzialny za ukryte listy i ich wysuwanie */

/* -------------------------------------------------- */

var today_ddmm = today_mm + '/' + today_dd;

if ( today_ddmm == "04/01" )
{
	$("body").addClass("april-fools");
}

/* To jest kodzik na Aprils Fools */

/* -------------------------------------------------- */


if ( today.getHours() > "18" )
{
	console.log('Dark mode: on');
	$('head').append('<link rel="stylesheet" href="./.css/dark.css"></link>')
}


/* -------------------------------------------------- */


// document.URL refers to the current url
var hash = new URL(document.URL).hash;

//console.log(hash);

if ( hash != null)
{
    hash = hash.split('#')[1];
	pływające_okienko(hash);
}

/* To jest kodzik który ogarnia hasha z url i odpala go w okienku */

/* -------------------------------------------------- */


});
/* ==================== KONIEC SKRYPTÓW GŁÓWNYCH STRONY ==================== */