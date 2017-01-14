<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    	$advert = M('advert');
    	$list = $advert->select();
    	$this->assign("list",$list);
    	$this->display();
    }
}