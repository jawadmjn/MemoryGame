<?php

class genrateBoxes {
  // If you increase OR decrease number of images in images folder than add total number of images here
  // For example at the moment we have total 36 images.
  private static $maxNumberOfImages = 36;
  private static $totalBoxes = array();
  private static $totalBoxesEncoded = array();
  private static $boxesToShow = NULL;
  private static $cols = NULL;
  private static $rows = NULL;

  public function __construct() {
    if (isset($_POST['boxesRequest']) && is_numeric($_POST['boxesRequest']) && $_POST['boxesRequest'] > 1) {
      self::$boxesToShow = min(self::$maxNumberOfImages, (intval($_POST['boxesRequest'])));
      self::$cols = ceil(sqrt(self::$boxesToShow));
      self::$rows = ceil(self::$boxesToShow / self::$cols);
    }
  }

  public static function getBoxes() {
    if (self::$boxesToShow) {
      while ( count(self::$totalBoxes) < floor(self::$boxesToShow / 2) ) {
        $rand = rand(1, self::$maxNumberOfImages);
        if (!in_array($rand, self::$totalBoxes)) {
          array_push(self::$totalBoxes, $rand);
        }
      }
      
      self::$totalBoxes = array_merge(self::$totalBoxes, self::$totalBoxes);
      shuffle(self::$totalBoxes);
    }
    // Using this function to store images id in encoded form as cookie.
    self::setEncodedValues();
    
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
    setcookie("totalBoxesEncoded_c", json_encode(self::$totalBoxesEncoded), time() + (86400 * 30), "/"); // 86400 = 1 day
  }

}

?>