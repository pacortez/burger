$(function() {
    $(".devour").on("click", function(event) {
        var id = $(this).data("id");
        var burgerName = $(this).data("name");
        var devoured = $(this).data("devoured");
        console.log(devoured);
        var devouredState = {
            burger_name: burgerName,
            devoured: !devoured
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then(
            function() {
                console.log("changed devoured state to: ", devouredState)
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burger").val().trim(),            
        };

        $.ajax("/api/burgers", {
            type: "POST", 
            data: newBurger
        }).then(
            function() {
                console.log("created new burger");
                location.reload();
            }
        );
    });







});