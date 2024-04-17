DROP TABLE IF EXISTS Items;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS OrderHistory;
DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS ShoppingCart;
DROP TABLE IF EXISTS Wishlist;

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


-- Inserting data into the Users table
INSERT INTO Users (Id, Username, Email, PasswordHash, FirstName, LastName, Address, PhoneNumber)
VALUES
    (1, 'john_doe', 'john@example.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'John', 'Doe', '123 Main St, City, Country', '123456789'),
    (2, 'jane_smith', 'jane@example.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', 'Jane', 'Smith', '456 Elm St, City, Country', '987654321');

-- Inserting data into the Items table
INSERT INTO Items (Id, Name, Description, Category, Price, Condition, Available, UserId)
VALUES
    (1, 'Smartphone', 'High-end smartphone with advanced features', 'Electronics', 799.99, 'New', true, 1),
    (2, 'Laptop', 'Powerful laptop for work and entertainment', 'Electronics', 1299.99, 'New', true, 1),
    (3, 'Headphones', 'Noise-cancelling headphones for immersive audio experience', 'Electronics', 249.99, 'New', true, 2),
    (4, 'Book', 'Best-selling novel by a renowned author', 'Books', 19.99, 'New', true, 2);

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