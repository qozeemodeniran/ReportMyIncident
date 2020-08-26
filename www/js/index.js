// NON-ADMIN USER PROFILE FUNCTION
function userProfile()
{
    $("#userProfile_link").click();
}

// NON-ADMIN REG FUNTCTION
function userReg()
{
    $("#userReg_link").click();
    // Validating reg begin
    $("#registerButton").click(function(){

    var url = "jdbc:mysql://localhost:3306/id13498794_app_user"    
    var email= $.trim($("#email").val()); 
    var password= $.trim($("#password").val()); 

    $("#status").text("Creating New Account..."); 
    var dataString="email="+email+"&password="+password+"&register="; 
    $.ajax({

        type: "POST",crossDomain: true, cache: false,
        url: url,
        data: dataString,
        success: function(data){
            if(data == "success")
                $("#status").text("Registered success");

            else if( data == "exist")
                $("#status").text("Account is already there");
            else if(data == "error")
                $("#status").text("Register Failed");
        }

    }); 

});
    // Validating reg end
}

// NON-ADMIN LOGIN
function userLog() 
{
    $("#userLog_link").click(); 
    //Validating login begin
    $("#loginButton").click(function(){
    var email= $.trim($("#email").val());
    var password= $.trim($("#password").val());
    $("#status").text("Authenticating...");
    var loginString ="email="+email+"&password="+password+"&login=";
    $.ajax({
        type: "POST",crossDomain: true, cache: false,
        url: url,
        data: loginString,
        success: function(data){
            if(data == "success") {
                $("#status").text("Login Success..!");
                localStorage.loginstatus = "true";
                
            }
            else if(data == "error")
            {
                $("#status").text("Login Failed..!");
            }
        }
    });
});
    //Valifating login end
}

// ADMIN LOGIN FUNCTION
function login()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username == "")
    {
        navigator.notification.alert("Please enter username", null, "Username Missing", "OK");
        return;
    }

    if(password == "")
    {
        navigator.notification.alert("Please enter password", null, "Password Missing", "OK");  
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://deserted-yards.000webhostapp.com/wp-admin/admin-ajax.php?action=login&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
    xhr.onload = function(){
        if(xhr.responseText == "FALSE")
        {
            navigator.notification.alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
        }
        else if(xhr.responseText == "TRUE")
        {
            // fetch_and_display_posts();
            $("#page_two_link").click();
        }
    }   
    xhr.send();
}

// ADD NEW POST PAGE FUNCTION
function addNewPost() {
    $("#page_three_link").click();
}

// POST RETRIEVAL FUNCTION
$(document).ready(function() {
        var rootUrl = 'https://deserted-yards.000webhostapp.com/';
        /**
         * wordpress url to retrieve all posts from our blog
         */
        const url = `${rootUrl}/wp-json/wp/v2/posts`;
        /**
         * wordpress url used to retrieve a token for authentication
         */
        var tokenUrl = `${rootUrl}/wp-json/jwt-auth/v1/token`;
        /**
         * in this custom scenario, we will be creating posts via admin
         * access however in complex cases you should be able to register
         * new users, the admin username and password is needed to retrieve
         * a token which will be attached
         * as headers to subsequent requests for authentication
         */
        var adminDet = {
            username: 'qozeemodeniran',
            password: 'lastBORN@231'
        };
        /**
         * variable to store token retrived from the api
         */
        var token;
        loadData();
        /**
         * ajax post request to retrieve the token once the app loads
         */
        $.post(tokenUrl, adminDet,
            function(data, status) {
                console.log("token: " + data.token);
                token = data.token;
            });
        /**
         * loadData() function makes a get request to retrieve
         * all posts from the wordpress blog
         */
        function loadData() {
            $.getJSON(url, function(data) {
                console.log(data);
                /**
                 * removes the spinner once a response is gotten from the api
                 */
                $("#spinner").remove();
                /**
                 * ensures that the div tag with id= mainDiv
                 * is empty before appending innerHtml to it
                 */
                $("#mainDiv").empty();
                /**reiterates through each list in the json oblect
                 * while appending it to the div tag with id= mainDiv
                 */
                for (var i = 0; i < data.length; i++) {
                    var div = document.createElement('div');
                    div.innerHTML = `
        <div class="card pt-1">
        <div class="card-body">
        <h4 class="card-title">${data[i].title.rendered}</h4>
        <p class="card-text textwrap">${data[i].content.rendered}</p>
        </div>
        </div>
        `;
                    $("#mainDiv").append(div);
                };
            });
        }
        /**
         * on form submission
         * submits the required parameters to create a new post in the
         * wordpress blog
         */
        $('form').submit(function(event) {
            // stop the form from submitting the normal way and refreshing the page
            event.preventDefault();
            // get the form data
            // there are many ways to get this data using jQuery (you can use the
            //class or id also) 
            var formData = {
                title: $('input[name=title]').val(),
                content: $('textarea[name=content]').val(),
                status: 'publish'
            };
            console.log(formData);
            $.ajax({
                url: url,
                method: 'POST',
                data: JSON.stringify(formData),
                crossDomain: true,
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function(data) {
                    console.log(data);
                    /**
                     * refreshes app-content to display latest posts
                     */
                    loadData();
                },
                error: function(error) {
                    console.log(error);
                }
            });
        });
    });
// *********************************************
