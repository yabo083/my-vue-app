import request from "./request.js";

/**
 * API模块
 * @module api
 */

export default {


    /**
     * mock测试用api
     */
    getCountData() {
        return request({
            url: '/home/getCountData',
            method: 'get',
            mock: true
        })
    },

    getOrderData() {
        return request({
            url: '/home/getChartData',
            method: 'get',
            mock: true
        })
    },


    /**
     * 获取链接列表
     * @function
     * @returns {Promise} 包含链接列表的Promise对象
     */
    getLinkList() {
        return request({
            url: '/link/list',
            method: 'get'
        })
    },

    /**
     * 添加链接
     * @function
     * @param {Object} link - 链接对象
     * @returns {Promise} 包含添加结果的Promise对象
     */
    addLink(link) {
        return request({
            url: '/link/add',
            method: 'post',
            data: link
        })
    },

    /**
     * 更新链接
     * @function
     * @param {Object} link - 链接对象
     * @returns {Promise} 包含更新结果的Promise对象
     */
    updateLink(link) {
        return request({
            url: `/link/update`,
            method: 'put',
            data: link
        })
    },

    /**
     * 删除链接
     * @function
     * @param {string} id - 链接ID
     * @returns {Promise} 包含删除结果的Promise对象
     */
    deleteLink(id) {
        return request({
            url: `/link/delete/${id}`,
            method: 'delete'
        })
    },


    /**
     * 获取公司信息列表
     * @function
     * @returns {Promise} 包含公司信息列表的Promise对象
     */
    getCompanyInfoList() {
        return request({
            url: '/companyInfo/list',
            method: 'get'
        })
    },

    /**
     * 添加公司信息
     * @function
     * @param {Object} companyInfo - 公司信息对象
     * @returns {Promise} 包含添加结果的Promise对象
     */
    addCompanyInfo(companyInfo) {
        return request({
            url: '/companyInfo/add',
            method: 'post',
            data: companyInfo
        })
    },

    /**
     * 更新公司信息
     * @function
     * @param {Object} companyInfo - 公司信息对象
     * @returns {Promise} 包含更新结果的Promise对象
     */
    updateCompanyInfo(companyInfo) {
        return request({
            url: `/companyInfo/update`,
            method: 'put',
            data: companyInfo
        })
    },

    /**
     * 删除公司信息
     * @function
     * @param {string} id - 公司信息ID
     * @returns {Promise} 包含删除结果的Promise对象
     */
    deleteCompanyInfo(id) {
        return request({
            url: `/companyInfo/delete/${id}`,
            method: 'delete'
        })
    },


    /**
     * 获取文章列表
     * @function
     * @returns {Promise} 包含文章列表的Promise对象
     */
    getArticleList() {
        return request({
            url: '/article/list',
            method: 'get'
        })
    },

    /**
     * 添加文章
     * @function
     * @param {Object} article - 文章对象
     * @returns {Promise} 包含添加结果的Promise对象
     */
    addArticle(article) {
        return request({
            url: '/article/add',
            method: 'post',
            data: article
        })
    },

    /**
     * 更新文章
     * @function
     * @param {Object} article - 文章对象
     * @returns {Promise} 包含更新结果的Promise对象
     */
    updateArticle(article) {
        return request({
            url: `/article/update`,
            method: 'put',
            data: article
        })
    },

    /**
     * 删除文章
     * @function
     * @param {string} id - 文章ID
     * @returns {Promise} 包含删除结果的Promise对象
     */
    deleteArticle(id) {
        return request({
            url: `/article/delete/${id}`,
            method: 'delete'
        })
    },


    /**
     * 获取分类列表
     * @function
     * @returns {Promise} 包含分类列表的Promise对象
     */
    getCategoryList() {
        return request({
            url: '/category/list',
            method: 'get'
        })
    },

    /**
     * 添加分类
     * @function
     * @param {Object} category - 分类对象
     * @returns {Promise} 包含添加结果的Promise对象
     */
    addCategory(category) {
        return request({
            url: '/category/add',
            method: 'post',
            data: category
        })
    },

    /**
     * 更新分类
     * @function
     * @param {Object} category - 分类对象
     * @returns {Promise} 包含更新结果的Promise对象
     */
    updateCategory(category) {
        return request({
            url: `/category/update`,
            method: 'put',
            data: category
        })
    },

    /**
     * 删除分类
     * @function
     * @param {string} id - 分类ID
     * @returns {Promise} 包含删除结果的Promise对象
     */
    deleteCategory(id) {
        return request({
            url: `/category/delete/${id}`,
            method: 'delete'
        })
    },


    /**
     * 获取文章分类列表
     * @function
     * @returns {Promise} 包含文章分类列表的Promise对象
     */
    getAssociationList() {
        return request({
            url: '/association/list',
            method: 'get'
        })
    },

    /**
     * 添加文章分类
     * @function
     * @param {Object} association - 文章分类对象
     * @returns {Promise} 包含添加结果的Promise对象
     */
    addAssociation(selectedAssociation) {
        return request({
            url: '/association/add',
            method: 'post',
            data: selectedAssociation
        })
    },

    /**
     * 更新文章分类
     * @function
     * @param {Object} associationWithOldData - 包含其他数据的文章分类对象
     * @returns {Promise} 包含更新结果的Promise对象
     */
    updateAssociation(association) {
        return request({
            url: `/association/update`,
            method: 'put',
            data: association
        })
    },

    /**
     * 删除文章分类
     * @function
     * @param {Object} association - 文章分类对象
     * @returns {Promise} 包含删除结果的Promise对象
     */
    deleteAssociation(id) {
        return request({
            url: `/association/delete/${id}`,
            method: 'delete',
        })
    },

    /**
     * 获取所有可用栏目
     * @function
     * @returns {Promise} 包含所有可用栏目的Promise对象
     */
    getAllAvailableCategory() {
        return request({
            url: '/association/allAvailableCategory',
            method: 'get'
        })
    },

    /**
     * 获取排除了已建立关联的可用文章
     * @function
     * @param {String} categoryId - 栏目ID
     * @returns {Promise} 包含排除了已建立关联的可用文章的Promise对象
     */
    getAllAvailableArticle(categoryId) {
        return request({
            url: `/association/allAvailableArticle/${categoryId}`,
            method: 'get'
        })
    },

};
