<?php
    declare(strict_types=1);
    require_once 'Item.php';
    require_once 'OrderHistory.php';
    require_once 'OrderItems.php';
    require_once 'ShoppingCart.php';
    require_once 'Users.php';
    require_once 'Wishlist.php';
    require_once 'Reviews.php';
    require_once 'Message.php';
    require_once 'Categories.php';
    require_once 'Conditions.php';
    require_once 'SubCategory.php';
    require_once 'SIzes.php';
    
    class Database {
        private static $instance = null;
        private $conn;
    
        public function __construct($databasePath) {
            
            try {
                $this->conn = new PDO("sqlite:$databasePath");
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
            }
        }
    
        public static function getInstance() : Database {
            if (self::$instance === null) {
                self::$instance = new Database('../database/database.db');
            }
            return self::$instance;
        }
    
        public function getConnection() : PDO {
            return $this->conn;
        }

        public function getItemById($id) : Item {
            $stmt = $this->conn->prepare("SELECT * FROM items WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $row = $stmt->fetch();
            return new Item(
                $row['Id'],
                $row['Name'],
                $row['Description'],
                $row['Brand'],
                $row['Model'],
                $row['CategoryId'],
                $row['Size'],
                $row['Price'],
                $row['ConditionId'],
                $row['Available'],
                $row['AvailableForDelivery'],
                $row['SubCategory'],
                $row['NumberOfImages'],
                $row['UserId']
            );
        }

        public function getSubCategoryById($id) : SubCategory {
            $stmt = $this->conn->prepare("SELECT * FROM subcategories WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $row = $stmt->fetch();
            return new SubCategory($row['SUbCategoryId'], $row['ParentCategory'] , $row['Name']);
        }
        
        public function getCategoryById($id) : Category {
            $stmt = $this->conn->prepare("SELECT * FROM categories WHERE CategoryId = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $row = $stmt->fetch();
            return new Category($row['CategoryId'], $row['Name']);
        }

        public function getItemsName() : array {
            $stmt = $this->conn->prepare("SELECT * FROM items");
            $stmt->execute();
            $items = [];    
            while ($row = $stmt->fetch()) {
                $items[] = $row['Name'];
            }
            return $items;
        }

        public function getItems() : array {
            $stmt = $this->conn->prepare("SELECT * FROM Items");
            $stmt->execute();
            $items = [];
            while ($row = $stmt->fetch()) {
            $items[] = new Item(
                $row['Id'],
                $row['Name'],
                $row['Description'],
                $row['Brand'],
                $row['Model'],
                $row['CategoryId'],
                $row['Size'],
                $row['Price'],
                $row['ConditionId'],
                $row['Available'],
                $row['AvailableForDelivery'],
                $row['SubCategory'],
                $row['NumberOfImages'],
                $row['UserId']
            );
            }
            return $items;
        }

        public function getAllItems() : array {
            
            $stmt = $this->conn->prepare("SELECT * FROM Items");
            $stmt->execute();
            $items = [];
            while ($row = $stmt->fetch()) {
                $items[] = [
                    $row['Id'],
                    $row['Name'],
                    $row['Description'],
                    $row['Category'],
                    $row['Price'],
                    $row['Condition'],
                    $row['Available'],
                    $row['UserId'],
                    $row['photo_img_col']
                ];
            }
            return $items;
        }

        public function getItemByUserId($userId) : array {
            $stmt = $this->conn->prepare("SELECT * FROM Items WHERE UserId = :userId");
            $stmt->bindParam(':userId', $userId);
            $stmt->execute();
            $items = [];
            while ($row = $stmt->fetch()) {
                $items[] = new Item(
                    $row['Id'],
                    $row['Name'],
                    $row['Description'],
                    $row['Brand'],
                    $row['Model'],
                    $row['CategoryId'],
                    $row['Size'],
                    $row['Price'],
                    $row['ConditionId'],
                    $row['Available'],
                    $row['AvailableForDelivery'],
                    $row['SubCategory'],
                    $row['NumberOfImages'],
                    $row['UserId']
                );
            }
            return $items;
        }        

        public function insertItem(Item $item) {
            $stmt = $this->conn->prepare("INSERT INTO items (Name, Description, Category, Brand ,price, condition, available, userId) VALUES (:name, :description, :category, :price, :condition, :available, :userId)");
            $stmt->bindParam(':name', $item->name);
            $stmt->bindParam(':description', $item->description);
            $stmt->bindParam(':brand', $item->brand);
            $stmt->bindParam(':category', $item->category);
            $stmt->bindParam(':price', $item->price);
            $stmt->bindParam(':condition', $item->condition);
            $stmt->bindParam(':available', $item->available);
            $stmt->bindParam(':userId', $item->userId);
            $stmt->execute();
        }

        public function insertImageOnItem(int $itemId, array $imageData) : void {
            if (!isset($imageData['name']) || !isset($imageData['tmp_name']) || !isset($imageData['error']) || !isset($imageData['size'])) {
                echo "Error: Invalid image data.";
                return;
            }
            
            if ($imageData['error'] !== UPLOAD_ERR_OK) {
                echo "Error uploading image: " . $imageData['error'];
                return;
            }
            // Temporary file path
            $tempImagePath = $imageData['tmp_name'];
        
            // Call the Python script with the item ID and temporary image path
            $command = 'python3 insert_image.py ' . $itemId . ' ' . escapeshellarg($tempImagePath);
            $output = exec($command);
            echo $output;
        }

        public function updateItem(Item $item) {
            $stmt = $this->conn->prepare("UPDATE items SET name = :name, description = :description, category = :category, price = :price, condition = :condition, available = :available, userId = :userId WHERE id = :id");
            $stmt->bindParam(':name', $item->name);
            $stmt->bindParam(':description', $item->description);
            $stmt->bindParam(':category', $item->category);
            $stmt->bindParam(':price', $item->price);
            $stmt->bindParam(':condition', $item->condition);
            $stmt->bindParam(':available', $item->available);
            $stmt->bindParam(':userId', $item->userId);
            $stmt->bindParam(':id', $item->id);
            $stmt->execute();
        }

        public function deleteItem($id) {
            $stmt = $this->conn->prepare("DELETE FROM items WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
        }

        public function getOrderHistoryById($id) : OrderHistory {
            $stmt = $this->conn->prepare("SELECT * FROM orderHistory WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $row = $stmt->fetch();
            return new OrderHistory($row['id'], $row['userId'], $row['orderDate'] , $row['totalPrice'], $row['status']);
        }        

        public function getOrderHistories() : array {
            $stmt = $this->conn->prepare("SELECT * FROM orderHistory");
            $stmt->execute();
            $orderHistories = [];
            while ($row = $stmt->fetch()) {
                $orderHistories[] = new OrderHistory($row['id'], $row['userId'], $row['orderDate'] , $row['totalPrice'], $row['status']);
            }
            return $orderHistories;
        }

        public function insertOrderHistory(OrderHistory $orderHistory) {
            $stmt = $this->conn->prepare("INSERT INTO OrderHistory (OrderId , UserId, OrderDate, TotalPrice, Status) VALUES (:orderId, :userId, :orderDate, :totalPrice, :status)");
            $stmt->bindParam(':userId', $orderHistory->UserId);
            $stmt->bindParam(':orderDate', $orderHistory->OrderDate);
            $stmt->bindParam(':totalPrice', $orderHistory->TotalPrice);
            $stmt->bindParam(':status', $orderHistory->Status);
            $stmt->bindParam(':orderId', $orderHistory->OrderId);
            $stmt->execute();
        }

        public function getXRandItems(int $x) : array {
            $stmt = $this->conn->prepare("SELECT * FROM items ORDER BY RANDOM() LIMIT :x");
            $stmt->bindParam(':x', $x);
            $stmt->execute();
            $items = [];
            while ($row = $stmt->fetch()) {
                $items[] = new Item(
                    $row['Id'],
                    $row['Name'],
                    $row['Description'],
                    $row['Brand'],
                    $row['Model'],
                    $row['CategoryId'],
                    $row['Size'],
                    $row['Price'],
                    $row['ConditionId'],
                    $row['Available'],
                    $row['AvailableForDelivery'],
                    $row['SubCategory'],
                    $row['NumberOfImages'],
                    $row['UserId']
                );
            }
            return $items;
        }

        function getUserById($userId) : User {
            $stmt = $this->conn->prepare("SELECT * FROM Users WHERE Id = :userId");
            $stmt->bindParam(':userId', $userId);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user) {
                return new User(
                    $user['Id'],
                    $user['Username'],
                    $user['Email'],
                    $user['PasswordHash'],
                    $user['FirstName'],
                    $user['LastName'],
                    $user['Address'],
                    $user['PhoneNumber']
                );
            } else {
                return null;
            }
        }

        public function getReviewByReviewedUserId($userId) : array {
            $stmt = $this->conn->prepare("
            SELECT * 
            FROM 
                Reviews 
            JOIN 
                Users ON Reviews.Author = Users.Id
            WHERE 
                Reviews.UserReviewed = :userId
            ORDER BY Reviews.ReviewDate DESC;    
            ");
            $stmt->bindParam(':userId', $userId);
            $stmt->execute();
            $reviews = [];
            while ($row = $stmt->fetch()) {
               $author = $this->getUserById($row['Author']);

                $review = new Review(
                    $row['ReviewId'], 
                    $row['Rating'], 
                    $row['Comment'], 
                    $author,
                    $row['UserReviewed'], 
                    $row['ReviewDate']
                );

                $reviews[] = $review;
            }
            return $reviews;
        }

        public function getUserByEmail($email) : User {
            $stmt = $this->conn->prepare("SELECT * FROM Users WHERE Email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user) {
                return new User(
                    $user['Id'],
                    $user['Username'],
                    $user['Email'],
                    $user['PasswordHash'],
                    $user['FirstName'],
                    $user['LastName'],
                    $user['Address'],
                    $user['PhoneNumber']
                );
            } else {
                return null;
            }
        }

        public function getMessagesUser($userId) : array {
            $stmt = $this->conn->prepare("
            SELECT * FROM Messages
            WHERE Receiver = :userId
            GROUP BY Sender
            ORDER BY Timestamp DESC
        ");
            $stmt->bindParam(':userId', $userId);
            $stmt->execute();

            $messages = [];
            
            while($message = $stmt->fetch()) {
                $sender = $this->getUserById($message['Sender']);
                $receiver = $this->getUserById($message['Receiver']);
                $new_message = new Message(
                    $message['MessageId'],
                    $sender,
                    $receiver,
                    $message['Content'],
                    $message['Timestamp']
                );

                $messages[] = $new_message;

            }
            
            return $messages;
        }


        public function getMessagesSenderToUser($userId,$senderId) : array {
            $stmt = $this->conn->prepare("
            SELECT * FROM Messages
            WHERE Sender = :userId AND Receiver = :senderId
            UNION
            SELECT * FROM Messages
            WHERE Sender = :senderId AND Receiver = :userId
            ORDER BY Timestamp ASC");

            $stmt->bindParam(':userId', $userId);
            $stmt->bindParam(':senderId', $senderId);
            $stmt->execute();

            $messages = [];
            
            while($message = $stmt->fetch()) {
                $sender = $this->getUserById($message['Sender']);
                $receiver = $this->getUserById($message['Receiver']);
                $new_message = new Message(
                    $message['MessageId'],
                    $sender,
                    $receiver,
                    $message['Content'],
                    $message['Timestamp']
                );

                $messages[] = $new_message;

            }
            
            return $messages;
        }
    }
?>

