-- COMMAND + SHIFT + P then SQLITE: USE DATABASE then SQLITE: RUN QUERY 
-- DO NOT FORGET SEMICOLON(;) TO END QUERY

------- SELECT ALL queries -------

-- SELECT * FROM restaurants;
-- SELECT * FROM menus; 
-- SELECT * FROM items; 

------- JOIN queries -------

-- Display all the restaurants & their menus

SELECT restaurants.name, menus.title 
FROM restaurants 
JOIN menus ON restaurants.id = menus.restaurant_id;

-- Display all restaurants, menus & menu items 

SELECT restaurants.name, menus.title, items.name
FROM restaurants
JOIN menus ON restaurants.id = menus.restaurant_id
JOIN items ON menus.id = items.menu_id;

-- Display first restaurant, menus & items 

SELECT restaurants.name, menus.title, items.name
FROM restaurants
JOIN menus ON restaurants.id = menus.restaurant_id
JOIN items ON menus.id = items.menu_id
WHERE restaurants.id = 1;

-- COUNT menu items & GROUP BY menu title (header as "itemCount")

SELECT restaurants.name, menus.title, COUNT(items.name) as itemCount
FROM restaurants
JOIN menus ON restaurants.id = menus.restaurant_id
JOIN items ON menus.id = items.menu_id
GROUP BY menus.title;

-- COUNT menus & GROUP BY restaurant name 

SELECT restaurants.name, COUNT(menus.title) as menuCount
FROM restaurants
JOIN menus ON restaurants.id = menus.restaurant_id
GROUP BY restaurants.name;

-- COUNT menu items & GROUP BY restaurant name 

SELECT restaurants.name, COUNT(items.name) as itemCount
FROM restaurants
JOIN menus ON restaurants.id = menus.restaurant_id
JOIN items ON menus.id = items.menu_id
GROUP BY restaurants.name;

-- SUM the price of all the items on each menu 

SELECT menus.title, SUM(items.price) as totalPrice
FROM menus
JOIN items ON menus.id = items.menu_id
GROUP BY menus.title;

-- SELECT an item by id and display the restaurant name it belongs to next to it 

SELECT items.name as item, restaurants.name as restaurant
FROM restaurants
JOIN menus ON restaurants.id = menus.restaurant_id
JOIN items ON menus.id = items.menu_id
GROUP BY items.name;

------- Random queries ------- 

-- INSERT INTO menus (title, icon, restaurant_id)
-- VALUES ("A la carte Menu", "plate", 2);

-- DELETE FROM menus WHERE id=4;

-- CREATE TABLE items (
-- id INTEGER PRIMARY KEY,
-- name TEXT,
-- price DECIMAL, 
-- menu_id INTEGER
-- );

-- INSERT INTO items (name, price, menu_id)
-- VALUES ("Fig cream", 12.50, 2); 

-- INSERT INTO items (name, price, menu_id)
-- VALUES ("Petit Fours", 12.50, 2); 

-- INSERT INTO items (name, price, menu_id)
-- VALUES ("T-Bone Steak", 12.50, 3); 

-- INSERT INTO items (name, price, menu_id)
-- VALUES ("Tortellini", 12.50, 4); 