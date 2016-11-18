<?php
require "boxClass.php";
$box = new genrateBoxes();
$totalBoxes = $box->getBoxes();
?>
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Memory</title>
    <link rel="stylesheet" href="css/memory.css" />
    <script src="js/lib/jquery.js"></script>
    <script src="js/memory.js"></script>
  </head>
  <body>
    <?php
    if (!empty($totalBoxes)) {
      $cols = $box->getCols();
      $rows = $box->getRows();
      echo '<div id="memory">';
      echo '<a id="exitGame" href=".">Exit Game</a>';
      echo '<p id="timer"><span id="minutes">0</span> Minutes, <span id="seconds">0</span> Seconds</p>';
      for ($r = 0; $r < $rows; $r++) {
        echo '<ul>';
        for ($c = 0; $c < $cols; $c++) {
          $i = $r * $cols + $c;
          if (isset($totalBoxes[$i])) {
            echo '<li><div id="'.$i.'" onclick="showImage(this);"></div></li>';
          }
        }
        echo '</ul>';
      }
      echo '</div>';
    }
    else {
      echo '<h1>Play Memory</h1>'
        . '<form id="memory" action="." method="post">'
          . '<label for="boxesRequest">Please Enter Number of Cards ( the value should be greater than 1 ):</label>'
          . '<input type="text" id="boxesRequest" name="boxesRequest" value="" />'
          . '<input type="submit" value="Start the Game"/>'
        . '</form>';
    }
    ?>
    <div id="success">
      Congratulation you have solved all the puzzles in <span id="successMinutes">0</span> Minutes, <span id="successSeconds">0</span> Seconds
      <p><a href="index.php">Restart the game</a></p>
    </div>
  </body>
</html>