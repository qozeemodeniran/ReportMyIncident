<?php

$con = mysqli_connect('localhost:3306', 'id13498794_appuser', 'lastBORN@231', 'id13498794_app_user');

if(isset($_POST['register']))
{   
    $register = mysqli_num_rows(mysqli_query($con, "SELECT * FROM `users` WHERE `email` ='$email'"));
    if($register == 0)
    {
        $insert = mysqli_query($con,"INSERT INTO `wp_users` ( `userid`, `fullname`, `username` , `password` ) VALUES ('$userid', '$fullname', $username', '$password')");
        if($insert)
            echo "success";
        else
            echo "error";
    }
    else if($register != 0)
        echo "exist";
}


else if(isset($_POST['login']))
{

    $login = mysqli_num_rows(mysqli_query($con, "SELECT * FROM `users` WHERE `email` ='$email' AND `password` ='$password'"));
    if($login != 0)
        echo "success";
    else
        echo "error";

}

 ?>