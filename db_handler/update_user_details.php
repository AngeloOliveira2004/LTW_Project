<?php
$db = new PDO('mysql:host=localhost;dbname=your_database', 'username', 'password');

$stmt = $db->prepare("UPDATE users SET first_name = :first_name, last_name = :last_name WHERE user_id = :user_id");
$stmt->bindParam(':first_name', $_POST['first_name']);
$stmt->bindParam(':last_name', $_POST['last_name']);
$stmt->bindParam(':user_id', $_SESSION['userId']);
$stmt->execute();


if ($stmt->rowCount() > 0) {
    echo "Changes saved successfully.";
} else {
    echo "No changes were made.";
}

?>
