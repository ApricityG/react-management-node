/* 

-- 用户表
CREATE TABLE `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `name` VARCHAR(50) NOT NULL COMMENT '用户名称',
  `nickname` VARCHAR(50) DEFAULT NULL COMMENT '用户昵称',
  `dept_id` INT(11) NOT NULL COMMENT '所属部门ID',
  `phone` VARCHAR(20) NOT NULL COMMENT '手机号码',
  `status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '状态：0-禁用，1-正常',
  `create_time` DATETIME DEFAULT NULL COMMENT '创建时间',
  `update_time` DATETIME DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_dept_id` FOREIGN KEY (`dept_id`) REFERENCES `dept` (`id`)
);

-- 角色表
CREATE TABLE `role` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '角色编号',
  `name` VARCHAR(50) NOT NULL COMMENT '角色名称',
  `perms` VARCHAR(200) DEFAULT NULL COMMENT '权限字符',
  `order_num` INT(11) DEFAULT NULL COMMENT '显示顺序',
  `status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '状态：0-禁用，1-正常',
  `create_time` DATETIME DEFAULT NULL COMMENT '创建时间',
  `update_time` DATETIME DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
);

-- 菜单管理表
CREATE TABLE `menu` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `name` VARCHAR(50) NOT NULL COMMENT '菜单名称',
  `icon` VARCHAR(50) DEFAULT NULL COMMENT '图标',
  `order_num` INT(11) DEFAULT NULL COMMENT '排序',
  `perms` VARCHAR(200) DEFAULT NULL COMMENT '权限标识',
  `component` VARCHAR(200) DEFAULT NULL COMMENT '组件路径',
  `status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '状态：0-禁用，1-正常',
  `create_time` DATETIME DEFAULT NULL COMMENT '创建时间',
  `update_time` DATETIME DEFAULT NULL COMMENT '修改时间',
  `parent_id` INT(11) DEFAULT NULL COMMENT '所属菜单ID',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_menu_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `menu` (`id`)
);

-- 部门管理表
CREATE TABLE `dept` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '部门ID',
  `name` VARCHAR(50) NOT NULL COMMENT '部门名称',
  `order_num` INT(11) DEFAULT NULL COMMENT '排序',
  `status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '状态：0-禁用，1-正常',
  `create_time` DATETIME DEFAULT NULL COMMENT '创建时间',
  `update_time` DATETIME DEFAULT NULL COMMENT '修改时间',
  `parent_id` INT(11) DEFAULT NULL COMMENT '所属部门ID',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_dept_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `dept` (`id`)
);

-- 岗位管理表
CREATE TABLE `job` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '岗位ID',
  `code` VARCHAR(50) NOT NULL COMMENT '岗位编码',
  `name` VARCHAR(50) NOT NULL COMMENT '岗位名称',
  `status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '状态：0-禁用，1-正常',
  `create_time` DATETIME DEFAULT NULL COMMENT '创建时间',
  `update_time` DATETIME DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
);

-- 通知公告表
CREATE TABLE `notice` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `title` VARCHAR(50) NOT NULL COMMENT '公告标题',
  `type` INT(11) NOT NULL COMMENT '公告类型',
  `status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '状态：0-禁用，1-正常',
  `creator` VARCHAR(50) NOT NULL COMMENT '创建者',
  `create_time` DATETIME DEFAULT NULL COMMENT '创建时间',
  `update_time` DATETIME DEFAULT NULL COMMENT '修改时间',
  `content` TEXT COMMENT '详细内容',
  PRIMARY KEY (`id`)
);

-- 操作日志管理表
CREATE TABLE `operation_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '日志编号',
  `module` VARCHAR(50) NOT NULL COMMENT '系统模块',
  `type` VARCHAR(50) NOT NULL COMMENT '操作类型',
  `operator` VARCHAR(50) NOT NULL COMMENT '操作人员',
  `ip` VARCHAR(50) NOT NULL COMMENT '操作IP',
  `location` VARCHAR(50) NOT NULL COMMENT '操作地点',
  `status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '操作状态：0-失败，1-成功',
  `operate_time` DATETIME DEFAULT NULL COMMENT '操作日期',
  `elapsed_time` BIGINT(20) DEFAULT NULL COMMENT '耗时',
  `url` VARCHAR(200) DEFAULT NULL COMMENT '请求地址',
  `method` VARCHAR(50) DEFAULT NULL COMMENT '请求方式',
  `params` TEXT COMMENT '请求参数',
  `result` TEXT COMMENT '返回参数',
  PRIMARY KEY (`id`)
);

-- 登陆日志管理表
CREATE TABLE `login_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '访问编号',
  `user_name` VARCHAR(50) NOT NULL COMMENT '用户名称',
  `ip` VARCHAR(50) NOT NULL COMMENT '登陆IP',
  `location` VARCHAR(50) NOT NULL COMMENT '登陆地点',
  `browser` VARCHAR(50) NOT NULL COMMENT '浏览器名称',
  `os` VARCHAR(50) NOT NULL COMMENT '操作系统名称',
  `status` TINYINT(4) NOT NULL DEFAULT '1' COMMENT '登陆状态：0-失败，1-成功',
  `message` VARCHAR(200) DEFAULT NULL COMMENT '操作信息',
  `login_time` DATETIME DEFAULT NULL COMMENT '登陆日期',
  PRIMARY KEY (`id`)
);

*/