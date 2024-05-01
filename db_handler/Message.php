<?php

require_once 'Users.php';

class Message {
    public $messageId;
    public $sender;
    public $receiver;
    public $text;

    public function __construct($messageId, $sender, $receiver, $text) {
        $this->messageId = $messageId;
        $this->sender = $sender;
        $this->receiver = $receiver;
        $this->text = $text;
    }

    public function displayDetails() {
        echo "Message Id: " . $this->messageId . "<br>";
        echo "Sender: " . $this->sender . "<br>";
        echo "Receiver: " . $this->receiver . "<br>";
        echo "Text: " . $this->text . "<br>";
    }

    public function getMessageId() : int {
        return $this->reviewId;
    }

    public function getContent() : string {
        return $this->text;
    }

    public function getReceiver() : User {
        return $this->receiver;
    }

    public function getSender() : User {
        return $this->sender;
    }
}

?>
