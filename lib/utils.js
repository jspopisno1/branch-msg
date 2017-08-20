var npath = require('path');
var fs = require('fs');

/**
 * // 用于提供一些基础的 utils 方法
 * @def: utils: {}
 */
var utils = {

    /**
     * // 生成清洁的 path
     * // j('/a', 'b', 'c') => '/a/b/c'
     * // j('/a/b', '..', 'c') => '/a/c'
     * @def: .j: () => resolvedPath
     *  arguments: [string]     // 每段 path 的内容
     *
     */
    j: function () {
        return npath.resolve(npath.join.apply(npath, arguments));
    },

    /**
     * ///
     * 确保 target 的父级 folder 存在, 如果不存在, 则递归确保其父级的父级存在, 并创建父级 folder
     * ///
     * @def: .ensureFolder: target => undefined, throws isFileError
     *  target: string          // 一个 path, 可能是一个文件或文件夹
     *  isFileError: Exception  // 如果父级文件夹为 "一个文件" 则抛出该错误
     *      message: `$target.parent 是一个文件`
     */
    ensureFolder: function (target) {
        var dirname = npath.dirname(target);
        if (!fs.existsSync(dirname)) {
            utils.ensureFolder(dirname);
            fs.mkdirSync(dirname);
        }
        else if (fs.statSync(dirname).isFile()) {
            throw new Error(dirname + ' 是一个文件, 无法建立文件夹');
        }
    }
};

module.exports = utils;