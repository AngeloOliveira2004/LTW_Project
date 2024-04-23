<?php
declare(strict_types=1);
?>

<?php function register_form()
{?>


<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Page</title>
        <link rel="stylesheet" href="../css/loginsignuppage.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    </head>

    <body>
        <section id="signup">
            <form>
                <h1>Signup</h1>
                <label id="input">
                    <input type="text" name="Firstname" placeholder="name">
                </label>
                <label id="input">
                    <input type="text" name="Lastname" placeholder="surname">
                </label>
                <label id="input">
                    <input type="text" name="email" placeholder="email">
                </label>
                <label id="input">
                    <input type="password" name="password" placeholder="password">
                </label>
                <label>

                    <button formaction="#" formmethod="post" class="loginbutton"><a href="">Next</a></button>
                    <p id="Loginwith">or login with :</p>
                    <a href="#" class="google-login"><i class="fab fa-google"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                    <p id="reglink">Do you have an account?<a href="loginpage.html">Sign In</a></p>

            </form>

        </section>

    </body>

</html>

<?php } ?>


<?php function register2_form()
{?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="../css/loginsignuppage.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>

<body>
    <section id="signup">
        <form>
            <h1>Signup</h1>
            <label id="input">
                <input type="text" name="Username" placeholder="Username">
            </label>
            <label id="input">
                <input type="text" name="Adress" placeholder="Adress">
            </label>
            <label id="input">
                <select name="Country">
                    <option value="">Select Country</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                </select>
            </label>
            <label id="input">
                <input type="tel" name="Phonenumber" placeholder="Phone Number">
            </label>
         
            <label>
                <button formaction="#" formmethod="post" class="loginbutton">Sign up</button>
                <p id="Loginwith">or login with :</p>
                <a href="#" class="google-login"><i class="fab fa-google"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                <p id="reglink">Do you have an account?<a href="loginpage.html">Sign In</a></p>
            </label>
        </form>
    </section>
</body>

</html>

<?php } ?>

<?php function login_form()
{?>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Page</title>
        <link rel="stylesheet" href="../css/loginsignuppage.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    </head>

    <body>
        <section id="login">
            <form>
                <h1>Login</h1>
                <label id="input">
                    <input type="text" name="username" placeholder="username">
                </label>
                <label id="input">
                    <input type="password" name="password" placeholder="password">
                </label>
                <section>

                    <label id="Remember">
                        <input type="checkbox">
                        <span>Remember me</span>
                        <a href="#">Forgot password?</a>

                    </label>


                    <button formaction="#" formmethod="post" class="loginbutton">Login</button>
                    <p id="Loginwith">or login with :</p>
                    <a href="#" class="google-login"><i class="fab fa-google"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                    <p id="reglink">Don't have an account?<a href="signuppage.html">Register</a></p>
                </section>

            </form>

        </section>

    </body>

</html>
<?php } ?>