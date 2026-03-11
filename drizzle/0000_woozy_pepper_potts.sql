CREATE TABLE `books` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`author` varchar(255),
	`publisher` varchar(255),
	`cover_image` varchar(255),
	`total_pages` int NOT NULL,
	`status` enum('WISH','READING','COMPLETED') NOT NULL DEFAULT 'WISH',
	`start_date` date,
	`end_date` date,
	`rating` decimal(2,1),
	`one_liner` text,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `books_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `books` ADD CONSTRAINT `books_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;