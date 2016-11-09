<?php

class genrateBoxes {

  private static $maxNumberOfImages = 36;
  private static $totalBoxes = array();
  private static $totalBoxesEncoded = array();
  private static $boxesToShow = NULL;
  private static $cols = NULL;
  private static $rows = NULL;

  public function __construct() {
    if (isset($_GET['boxesRequest']) && is_numeric($_GET['boxesRequest']) && $_GET['boxesRequest'] > 0) {
      self::$boxesToShow = min(self::$maxNumberOfImages, (intval($_GET['boxesRequest'])));
      self::$cols = ceil(sqrt(self::$boxesToShow));
      self::$rows = ceil(self::$boxesToShow / self::$cols);
    }
  }

  public static function getBoxes() {
    if (isset($_GET['boxesRequest']) && is_numeric($_GET['boxesRequest']) && $_GET['boxesRequest'] > 0) {
      $numOfBoxesRequested = floor(self::$boxesToShow / 2);
      while (count(self::$totalBoxes) < $numOfBoxesRequested) {
        $rand = rand(1, self::$maxNumberOfImages);
        if (!in_array($rand, self::$totalBoxes))
          array_push(self::$totalBoxes, $rand);
      }
      self::$totalBoxes = array_merge(self::$totalBoxes, self::$totalBoxes);
      shuffle(self::$totalBoxes);
    }
    return self::$totalBoxes;
  }

  public static function getCols() {
    return self::$cols;
  }

  public static function getRows() {
    return self::$rows;
  }

  public static function setEncodedValues() {
    foreach (self::$totalBoxes as $value) {
      array_push(self::$totalBoxesEncoded, base64_encode($value + 250));
    }
    return self::$totalBoxesEncoded;
  }

}

?>