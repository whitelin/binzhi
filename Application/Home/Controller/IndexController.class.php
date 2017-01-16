<?php
namespace Home\Controller;
<<<<<<< HEAD
class IndexController extends HomeController {
    public function index(){
=======
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    	$advert = M('advert');
    	$list = $advert->select();
    	$this->assign("list",$list);
>>>>>>> e7b25b730add1dacb7877b8734ffadf44cd6a586
    	$this->display();
    }
}