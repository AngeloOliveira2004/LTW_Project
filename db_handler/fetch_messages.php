<?php

require_once (__DIR__ . '/../db_handler/DB.php');
session_start();

if(isset($_SESSION['userId'])) {
    $senderId = (int) $_GET['senderId'];
    
    $userId = (int) $_SESSION['userId'];

    $db = new Database("../database/database.db");

    var_dump($senderId);

    var_dump($userId);

    $receivedMessages = $db->getMessagesSenderToUser($userId,$senderId); // Vai buscar as mensagens mandadas pelo outro para o log-in user
    $sentMessages = $db->getMessagesSenderToUser($senderId,$userId); // Vai buscar as mensagens mandadas pelo log-in user para outro 

    var_dump($receivedMessages);
    var_dump($sentMessages);


    if($receivedMessages != NULL && $sentMessages != NULL){

        $messages = array_merge($sentMessages, $receivedMessages);
        header('Content-Type: application/json');
        echo json_encode($messages);

    }else if ($receivedMessages == NULL){

        header('Content-Type: application/json');
        echo json_encode($sentMessages);

    }else if ($sentMessages == NULL){

        header('Content-Type: application/json');
        echo json_encode($receivedMessages);

    }

} else {
    echo json_encode(['error' => 'userId parameter is missing']);
}
?>
