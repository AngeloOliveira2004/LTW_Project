<?php
    declare(strict_types=1);
    require_once 'Item.php';
    require_once 'OrderHistory.php';
    require_once 'OrderItems.php';
    require_once 'ShoppingCart.php';
    require_once 'Users.php';
    require_once 'Wishlist.php';
    
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
            return new Item($row['id'], $row['name'], $row['description'], $row['category'], $row['price'], $row['condition'], $row['available'], $row['userId']);
        }

        public function getItems() : array {
            $stmt = $this->conn->prepare("SELECT * FROM items");
            $stmt->execute();
            $items = [];
            while ($row = $stmt->fetch()) {
                $items[] = new Item($row['id'], $row['name'], $row['description'], $row['category'], $row['price'], $row['condition'], $row['available'], $row['userId']);
            }
            return $items;
        }

        public function insertItem(Item $item) {
            $stmt = $this->conn->prepare("INSERT INTO items (name, description, category, price, condition, available, userId) VALUES (:name, :description, :category, :price, :condition, :available, :userId)");
            $stmt->bindParam(':name', $item->name);
            $stmt->bindParam(':description', $item->description);
            $stmt->bindParam(':category', $item->category);
            $stmt->bindParam(':price', $item->price);
            $stmt->bindParam(':condition', $item->condition);
            $stmt->bindParam(':available', $item->available);
            $stmt->bindParam(':userId', $item->userId);
            $stmt->execute();
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



    }

?>

