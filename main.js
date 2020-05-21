// Con una chiamata ajax, recuperare i dischi musicali restituiti dall'api:
// https://flynn.boolean.careers/exercises/api/array/music
// Ciclare quindi i dischi e ottenuti e per ognuno di essi disegnare in pagina una card utilizzando handlebars.

// BONUS: creare una select con i generi dei dischi musicali (pop, rock, metal, jazz), tramite la quale si possono filtrare i dischi visualizzati (ad esempio: se nella tendina si seleziona il genere "metal", nella pagina saranno mostrati solo i dischi con il genere "metal").
$(document).ready(function () {
    //recupero html del disco e creo la funzione di handlebars
    var source = $("#disco-template").html();
    var templateFunc = Handlebars.compile(source);

    //vado a richiedere i dati che mi servono
    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/array/music",
        method: "GET",
        success: function (data) {
            dischi = data.response;
            //per ogni disco in dischi applico il suo contesto
            dischi.forEach(function (disco) {
                //a sinistra seleziono il placeholder di handlebars a destra il dato recuperato
                var context = {
                    genre: disco.genre,
                    poster: disco.poster,
                    title: disco.title,
                    author: disco.author,
                    year: disco.year,
                };
                //compilo il context
                var newHtml = templateFunc(context);
                //e lo appendo al contenitore html
                $(".cds-container").append(newHtml);
            });
        },
        error: function (request, status, error) {
            console.log(status); //error
            console.log(error); //Not Found
        },
    });

    //al cambio di select nascondo tutti i dischi rendo visibili sono quelli con data-genre cercato
    $(document).on("change", "select", function () {
        $(this)
            .closest(".select-container")
            .siblings(".cds-container")
            .find(".cd")
            .hide();
        changedGenre = this.value; //Rock - Jazz...
        $(this)
            .closest(".select-container")
            .siblings(".cds-container")
            .find(`[data-genre=${changedGenre}]`)
            .fadeIn(2000);
    });
});
