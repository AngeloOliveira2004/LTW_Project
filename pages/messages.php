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
        </header>

    <section class="messages-section">
        <article class="messages-rectangle">
            <h2>Messages</h2>
            <?php 
            $db = new Database("../database/database.db");
            $userId = $_SESSION['userId'];

            $messages = $db->getMessagesUser(2);
            
            foreach ($messages as $message) {
                $sender = $message->getSender();
                ?>
                    <div class="user-box">
                        <div class="user-container">
                            <img src="../assets/users/<?php echo $sender->getId(); ?>.png" alt="<?php echo $sender->getUsername(); ?>" id="item_image">
                            <h4><?php echo $sender->getUsername(); ?></h4>
                            <h4><?php echo $message->printTimestamp(); ?></h4>
                        </div>
                        <p>Content: <?php echo $message->getContent(); ?></p>
                    </div>
                <?php
            }
            ?>

        </article>

        <article class="open-messages">
            <h2>Messages Hub</h2>
            <form class = "text-box" action="../database/action_send_message.php">
                <div class="text-box-container">
                    <input type="text" id="user-message-input" placeholder="Type a message here:">
                    <button type="submit" class="user-message-button"><i class="fa fa-paper-plane"></i></button>
                </div>
            </form>
        </article>
    </section>
        
        <footer>
            <?php
                include 'templates/footer.php';
            ?>
        </footer>
    </body>
    </html>

