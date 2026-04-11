<?php
header('Content-Type: application/json');

$host = 'localhost';
$port = 3308; 
$dbname = 'clinic';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        echo json_encode(['success' => false, 'message' => 'Нет данных']);
        exit;
    }
    
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $phone = trim($input['phone'] ?? '');
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Некорректный email']);
        exit;
    }
    
    $phonePattern = '/^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/';
    if (!preg_match($phonePattern, $phone)) {
        echo json_encode(['success' => false, 'message' => 'Некорректный телефон. Формат: +71234567890']);
        exit;
    }
    
    $checkTable = $pdo->query("SHOW TABLES LIKE 'users'");
    if ($checkTable->rowCount() == 0) {
        echo json_encode(['success' => false, 'message' => 'Таблица не найдена']);
        exit;
    }
    
    $columns = $pdo->query("DESCRIBE users");
    $hasCreatedAt = false;
    while($col = $columns->fetch(PDO::FETCH_ASSOC)) {
        if($col['Field'] == 'created_at') $hasCreatedAt = true;
    }
    
    $stmt = $pdo->prepare("
        SELECT COUNT(*) FROM users 
        WHERE (name = :name OR email = :email OR phone = :phone) 
        AND created_at >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)
    ");
    
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone
    ]);
    
    $duplicateCount = $stmt->fetchColumn();
    
    if ($duplicateCount > 0) {
        echo json_encode([
            'success' => false, 
            'message' => 'Заявка с такими данными уже отправлена в течение последних 5 минут'
        ]);
        exit;
    }
    
    $stmt = $pdo->prepare("
        INSERT INTO users (name, email, phone) 
        VALUES (:name, :email, :phone)
    ");
    
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone
    ]);
    
    echo json_encode(['success' => true, 'message' => 'Заявка отправлена']);
    
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Ошибка БД: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Ошибка: ' . $e->getMessage()]);
}