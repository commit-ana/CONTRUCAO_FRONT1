-- Criar tabela User primeiro
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `resetToken` VARCHAR(191) NULL,
    `resetTokenExpiry` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Inserir usuário padrão para não quebrar dados existentes
INSERT INTO `User` (`id`, `name`, `email`, `password`) VALUES (1, 'Admin', 'admin@chronos.com', '$2a$10$placeholder');

-- Alterar Settings com DEFAULT 1
ALTER TABLE `Settings`
    ADD COLUMN `userId` INTEGER NOT NULL DEFAULT 1,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `workTime` INTEGER NOT NULL DEFAULT 25,
    MODIFY `shortBreakTime` INTEGER NOT NULL DEFAULT 5,
    MODIFY `longBreakTime` INTEGER NOT NULL DEFAULT 15;

-- Alterar Task com DEFAULT 1
ALTER TABLE `Task` ADD COLUMN `userId` INTEGER NOT NULL DEFAULT 1;

-- Índice único em Settings.userId
CREATE UNIQUE INDEX `Settings_userId_key` ON `Settings`(`userId`);

-- Foreign keys
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;