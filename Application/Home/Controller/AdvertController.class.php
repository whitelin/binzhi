<?php
namespace Home\Controller;
class AdvertController extends HomeController {
	function _initialize() {
		echo "hhhhhhhhhhh";
	}
    public function index(){
    	$this->display('index');
    }
}