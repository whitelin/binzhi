<?php
namespace Home\Controller;
use Think\Controller;
class HomeController extends Controller {
    public function _empty(){
    	$this->error('404',U('Index/index'),3);
    }
}