<?php
session_start();

if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = '../assets/users/';

    $filename = $_SESSION['userId'] . '_' . "temp.png";
    
    $targetPath = $uploadDir . $filename;
    if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $targetPath)) {
        echo $targetPath;
    }
}
?>
