PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS OrderHistory;
DROP TABLE IF EXISTS ShoppingCart;
DROP TABLE IF EXISTS Wishlist;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Items;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Subcategory;
DROP TABLE IF EXISTS Sizes;
DROP TABLE IF EXISTS Conditions;

CREATE TABLE Categories (
    CategoryId INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Subcategory(
    SUbCategoryId INTEGER PRIMARY KEY AUTOINCREMENT,
    ParentCategory INTEGER,
    Name VARCHAR(50) UNIQUE NOT NULL,
    FOREIGN KEY (ParentCategory) REFERENCES Categories(CategoryId)
);

CREATE TABLE Sizes (
    SizeId INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE Conditions (
    ConditionId INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    Model VARCHAR(50),
    CategoryId INTEGER NOT NULL,
    Size VARCHAR(20) ,
    Price DECIMAL(10, 2) NOT NULL,
    ConditionId VARCHAR(20) NOT NULL,
    Available BOOLEAN NOT NULL,
    AvailableForDelivery BOOLEAN NOT NULL , 
    SubCategory VARCHAR(50),
    NumberOfImages INTEGER,

    UserId INTEGER NOT NULL,
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
    CartItemId INT PRIMARY KEY AUTOINCREMENT,
    UserId INT NOT NULL,
    ItemId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (ItemId) REFERENCES Items(Id)
);

CREATE TABLE Wishlist (
    WishlistId INT PRIMARY KEY AUTOINCREMENT,
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

CREATE TABLE Messages(
    MessageId INTEGER PRIMARY KEY AUTOINCREMENT,
    Sender INTEGER,
    Receiver INTEGER,
    ItemId INTEGER,
    Content TEXT,
    Timestamp DATETIME,
    FOREIGN KEY (Receiver) REFERENCES Users(Id),
    FOREIGN KEY (Sender) REFERENCES Users(Id),
    FOREIGN KEY (ItemId) REFERENCES Items(Id)
);


-- Insert some sample data into Categories, Sizes, and Conditions tables

INSERT INTO Categories (Name) VALUES
    ('Electronics'),
    ('Books'),
    ('Fashion'),
    ('Appliances'),
    ('Outdoor'),
    ('Music');

INSERT INTO Sizes (Name) VALUES
    ('Small'),
    ('Medium'),
    ('Large');

INSERT INTO Conditions (Name) VALUES
    ('New'),
    ('Used'),
    ('Refurbished');

-- Inserting data into the Users table
INSERT INTO Users (Username, Email, PasswordHash, FirstName, LastName, Address, PhoneNumber)
VALUES
    ('john_doe', 'john@example.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'John', 'Doe', '123 Main St, California, USA', '123456789'),
    ('jane_smith', 'jane@example.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', 'Jane', 'Smith', '456 Elm St, City, Country', '987654321'),
    ('alex_jones', 'alex@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Alex', 'Jones', '789 Oak St, State, Country', '456123789'),
    ('emily_brown', 'emily@example.com', '25d55ad283aa400af464c76d713c07ad', 'Emily', 'Brown', '987 Pine St, City, Country', '321654987'),
    ('mike_wilson', 'mike@example.com', 'e10adc3949ba59abbe56e057f20f883e', 'Mike', 'Wilson', '654 Maple St, Town, Country', '789456123'),
    ('sarah_green', 'sarah@example.com', 'f899139df5e1059396431415e770c6dd', 'Sarah', 'Green', '321 Birch St, Town, Country', '147258369'),
    ('chris_taylor', 'chris@example.com', 'c33367701511b4f6020ec61ded352059', 'Chris', 'Taylor', '852 Cedar St, City, Country', '963852741'),
    ('lisa_johnson', 'lisa@example.com', '5d41402abc4b2a76b9719d911017c592', 'Lisa', 'Johnson', '963 Walnut St, State, Country', '789123654'),
    ('ryan_miller', 'ryan@example.com', '202cb962ac59075b964b07152d234b70', 'Ryan', 'Miller', '741 Pine St, Town, Country', '654789123'),
    ('jessica_white', 'jessica@example.com', '098f6bcd4621d373cade4e832627b4f6', 'Jessica', 'White', '852 Oak St, City, Country', '321789456');
    
-- Inserting data into the Items table
INSERT INTO Items (Name, Description, Brand, CategoryId, Price, ConditionId, AvailableForDelivery, Available, NumberOfImages , UserId)
VALUES
    ('Smartphone', 'High-end smartphone with advanced features', 'Samsung', 1, 799.99, 1, true, true,5, 1),
    ('Laptop', 'Powerful laptop for work and entertainment', 'Dell', 1, 1299.99, 1, true, true,1, 1),
    ('Headphones', 'Noise-cancelling headphones for immersive audio experience', 'Sony', 1, 249.99, 1, true, true,1, 2),
    ('Book', 'Best-selling novel by a renowned author', 'Penguin', 2, 19.99, 1, true, true,1, 2),
    ('Smartwatch', 'Smartwatch with health and fitness tracking features', 'Apple', 1, 299.99, 1, true, true,1, 3),
    ('Tablet', 'Portable tablet for productivity and entertainment', 'Microsoft', 1, 499.99, 1, true, true,1, 3),
    ('Camera', 'High-quality camera for capturing memories', 'Canon', 1, 699.99, 1, true, true,1, 4),
    ('Gaming Console', 'Next-gen gaming console for immersive gaming experience', 'Nintendo', 1, 399.99, 1, true, true,1, 4),
    ('Backpack', 'Durable backpack for everyday use', 'Jansport', 3, 49.99, 1, true, true,1, 5),
    ('Sneakers', 'Stylish sneakers for casual wear', 'Nike', 3, 89.99, 1, true, true,1, 5),
    ('Smart Speaker', 'Voice-controlled smart speaker for home entertainment', 'Amazon', 1, 129.99, 1, true, true,1, 6),
    ('T-shirt', 'Comfortable cotton t-shirt for everyday wear', 'Adidas', 3, 29.99, 1, true, true,1, 6),
    ('Coffee Maker', 'Automatic coffee maker for brewing delicious coffee', 'Keurig', 4, 149.99, 1, true, true,1, 7),
    ('Vacuum Cleaner', 'High-powered vacuum cleaner for efficient cleaning', 'Dyson', 4, 299.99, 1, true, true,1, 7),
    ('Wireless Mouse', 'Ergonomic wireless mouse for smooth navigation', 'Logitech', 1, 39.99, 1, true, true,1, 8),
    ('Keyboard', 'Mechanical keyboard with customizable RGB lighting', 'Razer', 1, 99.99, 1, true, true,1, 8),
    ('Hiking Boots', 'Sturdy hiking boots for outdoor adventures', 'Merrell', 3, 129.99, 1, true, true,1, 9),
    ('Camping Tent', 'Spacious camping tent for overnight trips', 'Coleman', 5, 199.99, 1, true, true,1, 9),
    ('Guitar', 'Acoustic guitar for playing beautiful melodies', 'Fender', 6, 399.99, 1, true, true,1, 10),
    ('Drone', 'High-performance drone for aerial photography', 'DJI', 1, 799.99, 1, true, true,1, 10),
    ('Large Description Item', 'This is a very large description item that is used to test long descriptions in the database. It may contain multiple paragraphs of text to demonstrate the handling of large text fields in the database.', 'TestBrand', 1, 999.99, 1, true, true,1, 1);

-- Inserting data into the OrderHistory table
INSERT INTO OrderHistory (UserId, OrderDate, TotalPrice, Status)
VALUES
    (1, '2024-04-01 10:30:00', 799.99, 'Completed'),
    (2, '2024-04-02 15:45:00', 499.98, 'Pending');

-- Inserting data into the ShoppingCart table
INSERT INTO ShoppingCart (UserId, ItemId)
VALUES
    (1, 2),
    (2, 4);

-- Inserting data into the Wishlist table
INSERT INTO Wishlist (UserId, ItemId)
VALUES
    (1, 3),
    (2, 1);

 -- Insert data into Reviews table
INSERT INTO Reviews (Rating, Comment, Author, UserReviewed, ReviewDate) VALUES
(4.5, 'Great product!', 1, 1, '2024-04-20'),
(3.8, 'Could be better.', 2, 1, '2024-04-21'),
(5.0, 'Excellent service!', 2, 1, '2024-04-22');

-- Inserting data into the Messages table
INSERT INTO Messages (Sender, Receiver, ItemId, Content, Timestamp) VALUES
    (1, 2, 2, "Hey Jane, did you receive my email?", '2024-04-01 08:30:00'),
    (2, 2, 2, "Yes John, I got it. I'll reply soon.", '2024-04-02 10:15:00'),
    (3, 2, 2, "Hello John, just checking in on the progress.", '2024-04-03 11:45:00'),
    (6, 2, 2, "Hi Alex, the project is going well. Any updates from your end?", '2024-04-04 14:20:00'),
    (4, 2, 2, "Hi John, could you please review the latest draft?", '2024-04-05 16:30:00'),
    (1, 2, 2, "Hey Emily, can you attend the meeting tomorrow?", '2024-04-06 09:45:00'),
    (5, 2, 2, "John, don't forget about the deadline for the report.", '2024-04-07 13:10:00'),
    (1, 2, 2, "Sarah, could you provide the latest sales figures?", '2024-04-08 17:00:00'),
    (7, 2, 2, "John, can we discuss the budget for next quarter?", '2024-04-09 10:30:00'),
    (8, 2, 2, "Lisa, have you finalized the contracts?", '2024-04-10 14:45:00'),
    (9, 2, 2, "Hey John, when are you available for a catch-up?", '2024-04-11 16:15:00'),
    (9, 2, 1, "Hey John, when are you available for a catch-up?", '2024-04-11 16:15:00'),
    (2, 9, 2, "Hey Joy, when are you available for a catch-up?", '2024-04-11 16:20:00'),
    (7, 2, 2, "Jessica, could you review the presentation slides?", '2024-04-12 11:00:00');
