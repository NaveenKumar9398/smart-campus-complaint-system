CREATE DATABASE IF NOT EXISTS smart_campus;
USE smart_campus;

CREATE TABLE IF NOT EXISTS complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    student_id VARCHAR(30) NOT NULL,
    category VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    priority ENUM('Low','Medium','High') DEFAULT 'Medium',
    status ENUM('Pending','In Progress','Resolved') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO complaints
(student_name, student_id, category, location, title, description, priority, status)
VALUES
('Demo Student','DEMO001','Network','Block A','Wi-Fi not working',
 'Wi-Fi connection is unavailable in the laboratory.', 'High','Pending'),
('Demo Student','DEMO001','Electrical','Block B','Fan not working',
 'The ceiling fan in the classroom is not working.', 'Medium','In Progress'),
('Demo Student','DEMO002','Classroom','Block C','Projector issue',
 'Projector display is not turning on.', 'Medium','Resolved');
