<?php

// Allow requests from any origin
header('Access-Control-Allow-Origin: *');
// Allow specific HTTP methods (e.g., GET, POST, DELETE)
header('Access-Control-Allow-Methods: GET, POST, DELETE');
// Allow specific HTTP headers (if needed)
header('Access-Control-Allow-Headers: Content-Type');
// Set the appropriate content type for JSON responses
// header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond with 200 OK status to confirm that the server allows CORS
    http_response_code(200);
    exit();
}

// Set up the SQLite database connection
$db = new SQLite3('/path/to/mydatabase.sqlite');

// Create the customers table if it doesn't exist
$db->exec('CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT)');

// Function to insert a new customer
function insertCustomer($name, $email, $phone) {
    global $db;
    $stmt = $db->prepare('INSERT INTO customers (name, email, phone) VALUES (:name, :email, :phone)');
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);
    return $stmt->execute();
}

// Function to delete a customer by ID
function deleteCustomer($customerId) {
    global $db;
    $stmt = $db->prepare('DELETE FROM customers WHERE id = :id');
    $stmt->bindParam(':id', $customerId);
    return $stmt->execute();
}

// Function to get all customers
function getCustomers() {
    global $db;
    $result = $db->query('SELECT * FROM customers');
    $customers = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $customers[] = $row;
    }
    return $customers;
}

// Check the request method and perform the corresponding action
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle insert request
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    if ($name && $email && $phone) {
        if (insertCustomer($name, $email, $phone)) {
            echo json_encode(array('message' => 'Customer inserted successfully', 'result'=> 1));
        } else {
            http_response_code(500);
            echo json_encode(array('message' => 'Failed to insert customer', 'result'=> 0));
        }
    } else {
        http_response_code(400);
        echo json_encode(array('message' => 'Name, email, and phone are required', 'data'=>file_get_contents('php://input')));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Handle delete request
    $data = json_decode(file_get_contents('php://input'), true);
    $customerId = $data['customerId'];
    if ($customerId) {
        if (deleteCustomer($customerId)) {
            echo json_encode(array('message' => 'Customer deleted successfully', 'result'=> 1));
        } else {
            http_response_code(500);
            echo json_encode(array('message' => 'Failed to delete customer', 'result'=> 0));
        }
    } else {
        http_response_code(400);
        echo json_encode(array('message' => 'customerId is required', 'data'=>file_get_contents('php://input')));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle get request
    $customers = getCustomers();
    echo json_encode($customers);
} else {
    // Handle invalid request method
    http_response_code(405);
    echo json_encode(array('message' => 'Method Not Allowed'));
}
?>