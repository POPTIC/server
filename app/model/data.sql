DROP DATABASE IF EXISTS blog;
create database blog;
use blog;
create table users (
  userId int primary key auto_increment,
  userName char (40) not null unique,
  password char (40) not null,
  email char(11) null,
  school char(30) null,
  birthday char(16) null,
  avatar char(128) null
);

create table article(
  uuid char(36) primary key,
  userId int,
  articleUrl char(255),
  viewNumber int,
  likeNumber int,
  tag char(96),
  FOREIGN KEY (userId) REFERENCES users(userId)
);

create table img(
  id int primary key auto_increment,
  user_id int,
  img_url char(200),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

create table video(
  id int primary key auto_increment,
  user_id int,
  vedio_url char(200),
  cover_url char(200),
  video_size int,
  view_number int,
  like_number int,
  tag TINYINT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

insert into users
values
  (null, 'root', 'c4ca4238a0b923820dcc509a6f75849b', 'abc@qq.com', 'abcuni', '2024-3-18'),
  (null, 'poptic', 'f3694f162729b7d0254c6e40260bf15c', 'aaa@qq.com', 'university', '2024-3-16'),
  (null, 'Aaron', 'f3694f162729b7d0254c6e40260bf15c', 'aaa@qq.com', 'university', '2024-3-16'),
  (null, 'Abel', 'f3694f162729b7d0254c6e40260bf15c', 'aaa@qq.com', 'university', '2024-3-16'),
  (null, 'Adam', 'f3694f162729b7d0254c6e40260bf15c', 'aaa@qq.com', 'university', '2024-3-16'),
  (null, 'Alva', 'f3694f162729b7d0254c6e40260bf15c', 'aaa@qq.com', 'university', '2024-3-16'),
  (null, 'Alex', 'f3694f162729b7d0254c6e40260bf15c', 'aaa@qq.com', 'university', '2024-3-16');

insert into img
values
  (null, 1, '/1/pic1.webp'),
  (null, 1, '/1/pic2.jpg'),
  (null, 1, '/1/pic3.webp'),
  (null, 1, '/1/pic4.webp');

insert into article
values
  (null, 1, '/1/article1.html', 10, 10, 1),
  (null, 1, '/1/article2.html', 20, 5, 2),
  (null, 1, '/1/article3.html', 30, 6, 3),
  (null, 1, '/1/article4.html', 40, 8, 4);

insert into video
values
  (null, 1, '/1/frag_video.mp4', '/1/pic1.webp', 5524488 , 100, 20, 1);
  