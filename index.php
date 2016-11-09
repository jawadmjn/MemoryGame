<?php
include_once("boxClass.php");

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
    <script type="text/javascript">
      var boxValues = <?php echo json_encode($box->setEncodedValues()); ?>;
    </script>
  </head>
  <body>
    <?php
    if (!empty($totalBoxes)) {
      $cols = $box->getCols();
      $rows = $box->getRows();
      echo '<div id="memory">';
      for ($r = 0; $r < $rows; $r++) {
        echo '<ul>';
        for ($c = 0; $c < $cols; $c++) {
          $i = $r * $cols + $c;
          if (isset($totalBoxes[$i]))
            echo '<li><div id="'.$i.'" onclick="showImage(this);"></div></li>';
        }
        echo '</ul>';
      }
      echo '</div>';
    }
    else {
      echo '<h1>Play Memory</h1>'
        . '<form id="memory" action="." method="get">'
          . '<label for="boxesRequest">Please Enter Number of Cards:</label>'
          . '<input type="text" id="boxesRequest" name="boxesRequest" value="" />'
          . '<input type="submit" value="Start the Game"/>'
        . '</form>';
    }
    ?>
    <div id="success">
      Congratulation you have solved all the puzzles
      <p><a href="index.php">Restart the game</a></p>
    </div>
  </body>
</html>