<?php
declare(strict_types=1);
?>

<?php function register_login_form()
{?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="../../css/loginsignuppage.css">
    <title>Register and Login page</title>
</head>

<body>

    <section class="container" id="container">
        <section class="form-container sign-up">
            <form>
                <h1>Create Account</h1>
                <section class="social-icons">
                    <a href="#" class="icon"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>

                </section>
                <span>or Register with:</span>
                <input type="text" placeholder="Name">
                <input type="username" placeholder="Username">
                <input type="email" placeholder="Email">
                <input type="password" placeholder="Password">
                <input type="text" placeholder="Adress">
                <input type="phone number" placeholder="Phone number">
                <button id="nextButton">Next</button>
            </form>
        </section>
        <section class="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <section class="social-icons">
                    <a href="#" class="icon"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
   
                </section>
                <span>or Sign In with:</span>
                <input type="email" placeholder="Email">
                <input type="password" placeholder="Password">
                <a href="#">Forget Your Password?</a>
                <button>Sign In</button>
            </form>
        </section>
       
        <section class="toggle-container">
            <section class="toggle">
                <section class="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button class="hidden" id="login">Sign In</button>
                </section>
                <section class="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button class="hidden" id="register">Sign Up</button>
                </section>
            </section>
        </section>
    </section>

    <script src="../../javascript/loginsignup.js"></script>
</body>

</html>

<?php } ?>
