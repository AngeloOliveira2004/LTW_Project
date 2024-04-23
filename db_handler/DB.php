<?php
    declare(strict_types=1);
    require_once 'Item.php';
    require_once 'OrderHistory.php';
    require_once 'OrderItems.php';
    require_once 'ShoppingCart.php';
    require_once 'Users.php';
    require_once 'Wishlist.php';
    require_once 'Reviews.php';
    
    class Database {
        private static $instance = null;
        private $conn;
    
        public function __construct() {
            $databasePath = "../database.db";
            try {
                $this->conn = new PDO("sqlite:$databasePath");
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
            }
        }
    
        public static function getInstance() : Database {
            if (self::$instance === null) {
                self::$instance = new Database();
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
            return new Item($row['Id'], $row['Name'], $row['Description'], $row['Brand'], $row['Category'], $row['Price'], $row['Condition'], $row['Available'], $row['UserId'] , $row['photo_img_col']);
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
                $items[] = new Item($row['Id'], $row['Name'], $row['Description'],$row['Brand'] , $row['Category'], $row['Price'], $row['Condition'], $row['Available'],$row['UserId'] , $row['photo_img_col']);
            }
            return $items;
        }

        public function getItemByUserId($userId) : array {
            $stmt = $this->conn->prepare("SELECT * FROM Items WHERE UserId = :userId");
            $stmt->bindParam(':userId', $userId);
            $stmt->execute();
            $items = [];
            while ($row = $stmt->fetch()) {
                $items[] = new Item($row['Id'], $row['Name'], $row['Description'], $row['Brand'], $row['Category'], $row['Price'], $row['Condition'], $row['Available'],$row['UserId'] , $row['photo_img_col']);
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
                $items[] = new Item($row['Id'], $row['Name'], $row['Description'], $row['Brand'], $row['Category'], $row['Price'], $row['Condition'], $row['Available'],$row['UserId'] , $row['photo_img_col']);
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

    }
?>

