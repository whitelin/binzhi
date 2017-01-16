<?php 
namespace Admin\Controller;

class StudentController extends AdminController
{
	public function index()
	{
		$model = M('stu');

		$data = $model->order('id desc')->select();
	
		$this->assign('list', $data);

<<<<<<< HEAD
		echo "hhhhhhhhhhhh";

=======
>>>>>>> e7b25b730add1dacb7877b8734ffadf44cd6a586
		$this->display();
	}


	//执行添加数据的操作
	public function doadd()
	{
		$model = D('stu');
		//数据创建
		if (!$model->create()) {
			$this->error($model->getError());
			exit;
		}
		//执行添加
		if ($model->add() > 0) {
			$this->success('数据添加成功！', U('Student/index'));
		} else {
			$this->error('数据添加失败！');
		}

	}

	//加载修改页面
	public function edit()
	{
		$model = M('stu');
		$id = I('get.id');
		$data = $model->find($id);
		$this->assign('vo', $data);
		$this->display();
	}

	//执行修改
	public function save()
	{
		$model = D('stu');
		//数据创建
		if (!$model->create()) {
			$this->error($model->getError());
			exit;
		}
		//执行添加
		if ($model->save() > 0) {
			$this->success('数据修改成功！', U('Student/index'));
		} else {
			$this->error('数据修改失败！');
		}

	}


	//执行删除
	public function delete()
	{
		$id = I('get.id');
		$model = M('stu');
		if ($model->delete($id)) {
			$this->success('删除成功！', U('Student/index'));
		} else {
			$this->error('删除失败！');
		}
	}
}