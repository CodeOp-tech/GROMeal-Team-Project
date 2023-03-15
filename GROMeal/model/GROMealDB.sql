DROP TABLE IF EXISTS comparative;
DROP TABLE IF EXISTS meals;
DROP TABLE IF EXISTS weekdays;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS plans;
DROP TABLE IF EXISTS users;


-- TABLE for Users
CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL
);

-- user1 has password pass1 (etc)
INSERT INTO users (username, password, email)
VALUES 
    ('user1','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W','user1@acme.com'),
    ('user2','$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6','user2@acme.com'),
    ('user3','$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy','user3@acme.com');

-- TABLE for Weekly Plannings
CREATE TABLE plans (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    plan_title VARCHAR(200) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO plans (plan_title, user_id)
VALUES 
    ('MARCH PLANNING', 1);

-- TABLE for Saved Recipes
CREATE TABLE recipes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    API_id BIGINT,
    recipe_title VARCHAR(200) NOT NULL,
    recipe_image VARCHAR(200) NOT NULL,
    servings INT,
    meal_type VARCHAR(20) NOT NULL,
    plan_id INT,
    week_day VARCHAR(20) NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES plans(id)
);

INSERT INTO recipes (API_id, recipe_title, recipe_image, servings, meal_type, plan_id, week_day)
VALUES 
    (657579, "Quick Chicken Enchilada Soup", "https://spoonacular.com/recipeImages/657579-556x370.jpg", 4, "lunch", 1, "monday"),
    (657579, "Quick Chicken Enchilada Soup", "https://spoonacular.com/recipeImages/657579-556x370.jpg", 4, "lunch", 1, "friday"),
    (635113, "Black Forest Mini Cheesecakes", "https://spoonacular.com/recipeImages/635113-556x370.jpg", 4, "dinner", 1, "tuesday");

-- INSERT INTO recipes (API_id, recipe_title, servings)
-- VALUES 
--     ('user1','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W','user1@acme.com'),

-- TABLE for Days of the Week
-- CREATE TABLE weekdays (
--     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     day_name varchar(100) DEFAULT NULL
-- );

-- INSERT INTO weekdays (day_name)
-- VALUES ('monday'), ('tuesday'), ('wednesday'), ('thursday'), ('friday'), ('saturday'), ('sunday');

-- TABLE for Type of Meals
-- CREATE TABLE meals (
--     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     meal_type varchar(100) DEFAULT NULL
-- );

-- INSERT INTO meals (meal_type)
-- VALUES ('breakfast'), ('lunch'), ('dinner');

-- Comparative TABLE for Plans, Recipes, Weekdays and Meals
-- CREATE TABLE comparative (
--   plan_fk varchar(100) DEFAULT NULL,
--   recipe_fk varchar(100) DEFAULT NULL,
--   weekday_fk varchar(100) DEFAULT NULL
-- );
