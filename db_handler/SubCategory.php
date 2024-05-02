
<?php

class SubCategory {
    private $subCategoryId;
    private $parentCategory;
    private $name;

    public function __construct($subCategoryId, $parentCategory, $name) {
        $this->subCategoryId = $subCategoryId;
        $this->parentCategory = $parentCategory;
        $this->name = $name;
    }

    public function getSubCategoryId() {
        return $this->subCategoryId;
    }

    public function getParentCategory() {
        return $this->parentCategory;
    }

    public function getName() {
        return $this->name;
    }

    public function setParentCategory($parentCategory) {
        $this->parentCategory = $parentCategory;
    }

    public function setName($name) {
        $this->name = $name;
    }
}

?>