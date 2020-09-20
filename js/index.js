/*Jquery para los tooltip, popover y carrusel*/

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
        $('.carousel').carousel({
            interval: 3000
        });
        $('#contact').on('show.bs.modal', function (e) {
            console.log("el modal se esta ejectando");
            //remueve una clase
            /*agrega una clase
          $('#contactoBtn').removeClass('btn-outline-succes');
         */
            //desabilitar una propiedad
            $('#contactoBtn').prop('disabled', true);
        });
    });
