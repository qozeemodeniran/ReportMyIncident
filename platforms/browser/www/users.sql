CREATE TABLE `users` (

`userid` int(1) NOT NULL, 
`fullname` varchar(50) NOT NULL, 
`email` varchar(50) NOT NULL, 
`username` varchar(50) NOT NULL,
`password` varchar(50) NOT NULL

) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

ALTER TABLE `users` ADD PRIMARY KEY ( `userid` );
ALTER TABLE `users` MODIFY `userid` int(1) NOT NULL AUTO_INCREMENT;

-- INSERT INTO `users` (`userid`, `fullname`, `email`, `password`) VALUES
-- (1, '$fullname', '$email', '$password');
