
$("nav a").click(function(){
    $("nav a").css("cssText", "text-decoration: none !important;");
    $(this).css("cssText", "text-decoration: underline !important;");
});

window.setInterval(function(){
    $( ".form-group" ).has( "#loginMessage" ).addClass( "loginMessage" );
}, 1000);
window.setInterval(function(){
    $( ".form-group" ).has( "#loginMessage" ).removeClass( "loginMessage" );
}, 2000);