<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Profile</title>

    <link href="../css/editprofile.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/homepage.js"></script>
</head>
<body>
    <?php
        include 'templates/header.php';
    ?>

    <?php 
        require_once (__DIR__ . '/../db_handler/DB.php');
        session_start();
        $db = new Database("../database/database.db");
        $user = $db->getUserById($_SESSION['userId']);
        $current_first_name = $user->getFirstName();
        $current_last_name = $user->getLastName();
        $current_username = $user->getUsername();
        $current_email = $user->getEmail();

    ?>
    
    <div class="edit-profile-container">
        <h2>Edit Profile</h2>
        <form action="update_profile.php" method="POST" enctype="multipart/form-data">

            <img src="../../assets/users/<?php echo $_SESSION['userId']; ?>.png">

            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" value="<?php echo $current_first_name; ?>" required>

            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name"value="<?php echo $current_last_name; ?>" required>
            
            <label for="username">Username:</label>
            <input type="text" id="username"value="<?php echo $current_username; ?>" required>
            
            <label for="password">Password:</label>
            <input type="password" id="password"required>
            
            <label for="email">Email:</label>
            <input type="email" id="email"value="<?php echo $current_email; ?>" required>
            
            <label for="profile-picture">Profile Picture:</label>
            <input type="file" id="profile-picture" accept="image/*" onchange="previewImage(event)">
            
            <button type="submit">Save Changes</button>
        </form>
    </div>

    <?php
        include 'templates/footer.php';
    ?>
</body>
</html>