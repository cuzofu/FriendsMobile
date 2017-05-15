/**
 * Created by cuzofu on 2017/5/16.
 */
module.exports = Reflux.createActions([
    'personFetch',//请求人员列表
    'personBind',//绑定人员
    'personEdit',//编辑人员
    'personSearch',//查询人员
    'personGet',//获取人员
    'personSearchClear',//清空搜索结果
    'personZtClear',//清除查询状态
    'personZtSet',//设置过滤状态
    'personInit',//初始化
]);
