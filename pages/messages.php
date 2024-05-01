<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Messages</title>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
        <link href="../css/messages.css" rel="stylesheet">
    </head>
    <body>
        <?php
            require_once (__DIR__ . '/../db_handler/DB.php');
            session_start();
        ?>

        <header>
            <?php
                include 'templates/header.php';
            ?>
        <header>

    <section class="messages-section">
        <article class="messages-rectangle">
            <h2>Users</h2>
            <?php 
            $db = new Database();
            $userId = $_SESSION['userId'];

            $messages = $db->getMessagesUser(2);
            
            foreach ($messages as $message) {
                $sender = $message->getSender();
                echo '<div class="user-box">';
                echo '<h3><img src="../assets/users/' . $sender->getId() . '.png" alt="' . $sender->getUsername() . '" id="item_image">' . $sender->getUsername() . '</h3>';
                echo '<p>Content: ' . $message->getContent() . '</p>';
                echo '</div>';
            }
            ?>

        </article>

        <article class="open-messages">
            <h2>Messages Hub</h2>
        </article>
    </section>
        
        <footer>
            <?php
                include 'templates/footer.php';
            ?>
        </footer>
    </body>
    </html>

