<?php
namespace Home\Controller;
<<<<<<< HEAD
class AdvertController extends HomeController {
	function _initialize() {
		echo "hhhhhhhhhhh";
	}
    public function index(){
    	$this->display('index');
=======
use Think\Controller;
class AdvertController extends Controller {
    public function index(){
    	$this->display();
>>>>>>> e7b25b730add1dacb7877b8734ffadf44cd6a586
    }
}