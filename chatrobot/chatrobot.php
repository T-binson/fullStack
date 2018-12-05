	
<?php

	header('content-type:text/html;charset=utf-8');

	// echo "Hi!";

	/*$message = $_POST["message"];

	$robotMessage = array('Hello','not bad','asshole!','see you next time.','yeah!');
	echo $robotMessage[array_rand($robotMessage,1)];*/

	$message = $_POST["message"];
	switch ($message) {
		case '你好':
			$Helloarr = array("Hello!","Hi!","Long time no see","How's it going" );
			echo $Helloarr[array_rand($Helloarr,1)];
			break;
		case '吃了':
			$food = array("chicken","beef","pork","patato","tomato");
			echo $food[array_rand($food,1)];
			break;
		case '去哪玩':
			$places = array("park","library","supermarket","cinema");
			echo $places[array_rand($places,1)];
			break;
		default:
			$def = array("呵呵","滚","拜拜","再见");
			echo $def[array_rand($def,1)];
			break;
	}
?>

