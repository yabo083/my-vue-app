/**
 * 整个项目api的管理
 */

import request from "./request.js";

export default {
    /**
     * 查询所有
    GET /student/all
    接口ID：126143784
    接口地址：https://app.apifox.com/link/project/3617200/apis/api-126143784
     */
    getAllStudent() {
        return request({
            url: '/student/all',
            method: 'get'
        })
    },
    /**
     * 查询特定
  GET /student/4
  接口ID：126143825
  接口地址：https://app.apifox.com/link/project/3617200/apis/api-126143825
     */
    getStudentById(id) {
        return request({
            url: `/student/${id}`,
            method: 'get'
        })
    },

    /**
     * 新增学生信息
  POST /student/add
  接口ID：126146664
  接口地址：https://app.apifox.com/link/project/3617200/apis/api-126146664
     */
    addStudent(student) {
        return request({
            url: '/student/add',
            method: 'post',
            data: student
        })
    },

    /**
     * 新增学生信息
  POST /student/add
  接口ID：126146664
  接口地址：https://app.apifox.com/link/project/3617200/apis/api-126146664
     */
    updateStudent(student) {
        return request({
            url: `/student/update/${student.id}`,
            method: 'put',
            data: student
        })
    },

    /**
     * 删除特定
  DELETE /student/delete/2
  接口ID：126147790
  接口地址：https://app.apifox.com/link/project/3617200/apis/api-126147790
     */

    deleteStudent(id) {
        return request({
            url: `/student/delete/${id}`,
            method: 'delete'
        })
    }


}