<?php
namespace Home\Controller;
use Think\Controller;
class AdvertController extends Controller {
    public function index(){
    	$advert = M('advert');
    	$list = $advert->select();
    	dump($list);
    	$this->display();
    }
}