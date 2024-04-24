PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS Items;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS OrderHistory;
DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS ShoppingCart;
DROP TABLE IF EXISTS Wishlist;
DROP TABLE IF EXISTS Reviews;

CREATE TABLE Users (
    Id INT PRIMARY KEY NOT NULL,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(9)
);

CREATE TABLE Items (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(100) NOT NULL,
    Description TEXT NOT NULL,
    Brand VARCHAR(50) NOT NULL ,
    Category VARCHAR(50) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Condition VARCHAR(20) NOT NULL,
    Available BOOLEAN NOT NULL,
    UserId INTEGER NOT NULL,
    photo_img_col LONGBLOB,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE OrderHistory (
    OrderId INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER NOT NULL,
    OrderDate TIMESTAMP NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    Status TEXT CHECK(Status IN ('Pending', 'Completed', 'Cancelled')) NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE OrderItems (
    OrderItemId INT PRIMARY KEY,
    OrderId INT NOT NULL,
    ItemId INT NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES OrderHistory(OrderId),
    FOREIGN KEY (ItemId) REFERENCES Items(Id)
);

CREATE TABLE ShoppingCart (
    CartItemId INT PRIMARY KEY,
    UserId INT NOT NULL,
    ItemId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (ItemId) REFERENCES Items(Id)
);

CREATE TABLE Wishlist (
    WishlistId INT PRIMARY KEY,
    UserId INT NOT NULL,
    ItemId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (ItemId) REFERENCES Items(Id)
);

CREATE TABLE Reviews (
    ReviewId INT PRIMARY KEY,
    Rating DECIMAL NOT NULL,
    Comment TEXT NOT NULL,
    Author INT,
    UserReviewed INT,
    ReviewDate DATE NOT NULL,
    FOREIGN KEY (Author) REFERENCES Users(Id),
    FOREIGN KEY (UserReviewed) REFERENCES Users(Id)
);


-- Inserting data into the Users table
INSERT INTO Users (Id, Username, Email, PasswordHash, FirstName, LastName, Address, PhoneNumber)
VALUES
    (1, 'john_doe', 'john@example.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'John', 'Doe', '123 Main St, California, USA', '123456789'),
    (2, 'jane_smith', 'jane@example.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', 'Jane', 'Smith', '456 Elm St, City, Country', '987654321'),
    (3, 'alex_jones', 'alex@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Alex', 'Jones', '789 Oak St, State, Country', '456123789'),
    (4, 'emily_brown', 'emily@example.com', '25d55ad283aa400af464c76d713c07ad', 'Emily', 'Brown', '987 Pine St, City, Country', '321654987'),
    (5, 'mike_wilson', 'mike@example.com', 'e10adc3949ba59abbe56e057f20f883e', 'Mike', 'Wilson', '654 Maple St, Town, Country', '789456123'),
    (6, 'sarah_green', 'sarah@example.com', 'f899139df5e1059396431415e770c6dd', 'Sarah', 'Green', '321 Birch St, Town, Country', '147258369'),
    (7, 'chris_taylor', 'chris@example.com', 'c33367701511b4f6020ec61ded352059', 'Chris', 'Taylor', '852 Cedar St, City, Country', '963852741'),
    (8, 'lisa_johnson', 'lisa@example.com', '5d41402abc4b2a76b9719d911017c592', 'Lisa', 'Johnson', '963 Walnut St, State, Country', '789123654'),
    (9, 'ryan_miller', 'ryan@example.com', '202cb962ac59075b964b07152d234b70', 'Ryan', 'Miller', '741 Pine St, Town, Country', '654789123'),
    (10, 'jessica_white', 'jessica@example.com', '098f6bcd4621d373cade4e832627b4f6', 'Jessica', 'White', '852 Oak St, City, Country', '321789456');
    
-- Inserting data into the Items table
INSERT INTO Items (Id, Name, Description, Brand, Category, Price, Condition, Available, UserId)
VALUES
    (1, 'Smartphone', 'High-end smartphone with advanced features', 'Samsung', 'Electronics', 799.99, 'New', true, 1),
    (2, 'Laptop', 'Powerful laptop for work and entertainment', 'Dell', 'Electronics', 1299.99, 'New', true, 1),
    (3, 'Headphones', 'Noise-cancelling headphones for immersive audio experience', 'Sony', 'Electronics', 249.99, 'New', true, 2),
    (4, 'Book', 'Best-selling novel by a renowned author', 'Penguin', 'Books', 19.99, 'New', true, 2),
    -- Add more items with different brands here
    (5, 'Smartwatch', 'Smartwatch with health and fitness tracking features', 'Apple', 'Electronics', 299.99, 'New', true, 3),
    (6, 'Tablet', 'Portable tablet for productivity and entertainment', 'Microsoft', 'Electronics', 499.99, 'New', true, 3),
    (7, 'Camera', 'High-quality camera for capturing memories', 'Canon', 'Electronics', 699.99, 'New', true, 4),
    (8, 'Gaming Console', 'Next-gen gaming console for immersive gaming experience', 'Nintendo', 'Electronics', 399.99, 'New', true, 4),
    (9, 'Backpack', 'Durable backpack for everyday use', 'Jansport', 'Fashion', 49.99, 'New', true, 5),
    (10, 'Sneakers', 'Stylish sneakers for casual wear', 'Nike', 'Fashion', 89.99, 'New', true, 5),
    (11, 'Smart Speaker', 'Voice-controlled smart speaker for home entertainment', 'Amazon', 'Electronics', 129.99, 'New', true, 6),
    (12, 'T-shirt', 'Comfortable cotton t-shirt for everyday wear', 'Adidas', 'Fashion', 29.99, 'New', true, 6),
    (13, 'Coffee Maker', 'Automatic coffee maker for brewing delicious coffee', 'Keurig', 'Appliances', 149.99, 'New', true, 7),
    (14, 'Vacuum Cleaner', 'High-powered vacuum cleaner for efficient cleaning', 'Dyson', 'Appliances', 299.99, 'New', true, 7),
    (15, 'Wireless Mouse', 'Ergonomic wireless mouse for smooth navigation', 'Logitech', 'Electronics', 39.99, 'New', true, 8),
    (16, 'Keyboard', 'Mechanical keyboard with customizable RGB lighting', 'Razer', 'Electronics', 99.99, 'New', true, 8),
    (17, 'Hiking Boots', 'Sturdy hiking boots for outdoor adventures', 'Merrell', 'Fashion', 129.99, 'New', true, 9),
    (18, 'Camping Tent', 'Spacious camping tent for overnight trips', 'Coleman', 'Outdoor', 199.99, 'New', true, 9),
    (19, 'Guitar', 'Acoustic guitar for playing beautiful melodies', 'Fender', 'Music', 399.99, 'New', true, 10),
    (20, 'Drone', 'High-performance drone for aerial photography', 'DJI', 'Electronics', 799.99, 'New', true, 10);

-- Inserting data into the OrderHistory table
INSERT INTO OrderHistory (OrderId, UserId, OrderDate, TotalPrice, Status)
VALUES
    (1, 1, '2024-04-01 10:30:00', 799.99, 'Completed'),
    (2, 2, '2024-04-02 15:45:00', 499.98, 'Pending');

-- Inserting data into the ShoppingCart table
INSERT INTO ShoppingCart (CartItemId, UserId, ItemId)
VALUES
    (1, 1, 2),
    (2, 2, 4);

-- Inserting data into the Wishlist table
INSERT INTO Wishlist (WishlistId, UserId, ItemId)
VALUES
    (1, 1, 3),
    (2, 2, 1);

 -- Insert data into Reviews table
INSERT INTO Reviews (ReviewId, Rating, Comment, Author, UserReviewed, ReviewDate) VALUES
(1, 4.5, 'Great product!', 1, 1, '2024-04-20'),
(2, 3.8, 'Could be better.', 2, 1, '2024-04-21'),
(3, 5.0, 'Excellent service!', 2, 1, '2024-04-22');